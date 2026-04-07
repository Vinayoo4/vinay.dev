// API utility functions — use relative paths so the Next.js API routes are called directly.
const API_BASE = '/api';

// Contact API
export async function sendContactMessage(formData) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to send contact message');
  }
  return res.json();
}

// Chat API
export async function fetchChatMessages(room = 'general') {
  const res = await fetch(`${API_BASE}/chat?room=${encodeURIComponent(room)}`);
  if (!res.ok) throw new Error('Failed to fetch chat messages');
  return res.json();
}

export async function sendChatMessage(messageData) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(messageData),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to send chat message');
  }
  return res.json();
}

// Newsletter API
export async function subscribeNewsletter(email) {
  const res = await fetch(`${API_BASE}/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Subscription failed');
  }
  return res.json();
}

// Auth API
export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Login failed');
  }
  return res.json();
}