# SALTED HASH Integration Guide

## Overview
SALTed HASH is the central authentication hub for all projects, exposing JSON data and token-based handoff for app launches.

## Check Authentication
```javascript
const token = localStorage.getItem('saltedhash_token')
if (!token) {
  window.location.href = 'https://saltedhash.com/login?redirect=' + encodeURIComponent(window.location.href)
}
```

## Launch Another App from Hub
```javascript
function launchApp(appUrl) {
  const token = localStorage.getItem('saltedhash_token')
  const sep = appUrl.includes('?') ? '&' : '?'
  window.location.href = `${appUrl}${sep}token=${token}`
}
```

## Receive Token in Target App
```javascript
const token = new URLSearchParams(window.location.search).get('token')
if (token) localStorage.setItem('saltedhash_token', token)
```

## JSON Endpoints
- `/data/apps.json`
- `/data/opal-apps.json`
- `/data/users.json`
- `/data/waitlist.json`
- `/data/site-config.json`
