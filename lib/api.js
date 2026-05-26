import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://devvinay.me/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Contact API
export async function sendContactMessage(formData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://devvinay.me'}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error('Failed to send contact message');
  return res.json();
}

// Chat API
export async function fetchChatMessages() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://devvinay.me'}/api/chat`);
  if (!res.ok) throw new Error('Failed to fetch chat messages');
  return res.json();
}

export async function sendChatMessage(messageData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://devvinay.me'}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(messageData),
  });
  if (!res.ok) throw new Error('Failed to send chat message');
  return res.json();
}

export default api;