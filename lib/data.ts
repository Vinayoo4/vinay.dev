export async function fetchServices() {
  const res = await fetch("/api/services");
  return res.json();
}

export async function fetchProjects() {
  const res = await fetch("/api/projects");
  return res.json();
}

export async function fetchCertifications() {
  const res = await fetch("/api/certifications");
  return res.json();
}

export async function fetchChatData() {
  const res = await fetch("/api/chat");
  return res.json();
}

export async function sendChatMessage(room: string, user: string, message: string) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ room, user, message }),
  });
  return res.json();
}
