import { computed, ref } from 'vue'
import CryptoJS from 'crypto-js'

const HUB_URL = 'https://saltedhash.com'
const TOKEN_KEY = 'saltedhash_token'
const USER_KEY = 'saltedhash_user'
const USERS_KEY = 'users_json'

const getSecret = () => {
  const envSecret = import.meta.env.VITE_AUTH_SECRET
  if (!envSecret) throw new Error('VITE_AUTH_SECRET is required for auth encryption/signing (set it in .env or deployment environment variables)')
  return envSecret
}

const hashPassword = (password, salt = CryptoJS.lib.WordArray.random(16).toString()) => {
  const hash = CryptoJS.PBKDF2(password, salt, { keySize: 256 / 32, iterations: 10000 }).toString()
  return `${salt}:${hash}`
}

const verifyPassword = (password, storedHash) => {
  if (!storedHash) return false
  if (!storedHash.includes(':')) return false
  const [salt, hash] = storedHash.split(':')
  const computed = CryptoJS.PBKDF2(password, salt, { keySize: 256 / 32, iterations: 10000 }).toString()
  return hash === computed
}

const user = ref(null)
const token = ref(null)

const parseToken = (rawToken) => {
  try {
    const [encodedPayload, signature] = rawToken.split('.')
    const expected = CryptoJS.HmacSHA256(encodedPayload, getSecret()).toString()
    if (signature !== expected) return null
    return JSON.parse(atob(encodedPayload))
  } catch {
    return null
  }
}

const makeToken = (payload) => {
  const encodedPayload = btoa(JSON.stringify(payload))
  const signature = CryptoJS.HmacSHA256(encodedPayload, getSecret()).toString()
  return `${encodedPayload}.${signature}`
}

const getUsersData = async () => {
  const local = localStorage.getItem(USERS_KEY)
  if (local) return JSON.parse(local)
  const res = await fetch('/data/users.json')
  const data = await res.json()
  localStorage.setItem(USERS_KEY, JSON.stringify(data))
  return data
}

const setUsersData = (data) => localStorage.setItem(USERS_KEY, JSON.stringify(data))

export function useAuth() {
  const isAuthenticated = computed(() => !!token.value)

  async function initAuth() {
    const storedToken = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY)
    const encryptedUser = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY)
    const redirectToken = new URLSearchParams(window.location.search).get('token')

    if (redirectToken && !storedToken) {
      localStorage.setItem(TOKEN_KEY, redirectToken)
    }

    if (encryptedUser) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedUser, getSecret())
        user.value = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      } catch {
        localStorage.removeItem(USER_KEY)
      }
    }

    token.value = localStorage.getItem(TOKEN_KEY)
    return validateToken()
  }

  async function register(email, password, name = '') {
    if (password.length < 8) throw new Error('Password must be at least 8 characters')
    const usersData = await getUsersData()
    if (usersData.users.some((u) => u.email === email)) throw new Error('Email already registered')

    const passwordHash = hashPassword(password)
    usersData.users.push({
      id: `user-${Date.now()}`,
      email,
      name,
      passwordHash,
      token: null,
      tokenExpiry: null,
      createdAt: new Date().toISOString(),
      lastLogin: null,
      appAccess: {},
      preferences: { theme: 'light', language: 'en', notifications: true },
    })

    setUsersData(usersData)
    return login(email, password)
  }

  async function login(email, password, options = { remember: true }) {
    const usersData = await getUsersData()
    const foundUser = usersData.users.find((u) => u.email === email && verifyPassword(password, u.passwordHash))
    if (!foundUser) throw new Error('Invalid email or password')
    const expiryDays = usersData.config?.tokenExpiryDays || 30
    const payload = { userId: foundUser.id, email: foundUser.email, exp: Date.now() + expiryDays * 24 * 60 * 60 * 1000 }
    const generatedToken = makeToken(payload)

    foundUser.token = generatedToken
    foundUser.tokenExpiry = new Date(payload.exp).toISOString()
    foundUser.lastLogin = new Date().toISOString()
    setUsersData(usersData)

    token.value = generatedToken
    user.value = foundUser
    const storage = options.remember ? localStorage : sessionStorage
    const otherStorage = options.remember ? sessionStorage : localStorage
    storage.setItem(TOKEN_KEY, generatedToken)
    storage.setItem(USER_KEY, CryptoJS.AES.encrypt(JSON.stringify(foundUser), getSecret()).toString())
    otherStorage.removeItem(TOKEN_KEY)
    otherStorage.removeItem(USER_KEY)
    return foundUser
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    sessionStorage.removeItem(TOKEN_KEY)
    sessionStorage.removeItem(USER_KEY)
  }

  function validateToken() {
    if (!token.value) return false
    const payload = parseToken(token.value)
    if (!payload || Date.now() > payload.exp) {
      logout()
      return false
    }
    return true
  }

  async function subscribeToApp(appId, plan = 'early-bird') {
    if (!user.value) throw new Error('User not authenticated')
    user.value.appAccess[appId] = { hasAccess: true, subscribedAt: new Date().toISOString(), plan }
    localStorage.setItem(USER_KEY, CryptoJS.AES.encrypt(JSON.stringify(user.value), getSecret()).toString())
  }

  function hasAppAccess(appId) {
    return !!user.value?.appAccess?.[appId]?.hasAccess
  }

  function launchApp(app) {
    if (app.authRequired && !isAuthenticated.value) {
      window.location.href = `${HUB_URL}/login?redirect=${encodeURIComponent(window.location.href)}`
      return
    }
    const separator = app.url.includes('?') ? '&' : '?'
    window.location.href = `${app.url}${separator}token=${token.value ?? ''}`
  }

  return { user, token, isAuthenticated, initAuth, register, login, logout, validateToken, subscribeToApp, hasAppAccess, launchApp }
}
