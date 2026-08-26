const API_URL = "http://localhost:8080";

export async function getHealth() {
  const response = await fetch(`${API_URL}/api/health`);

  if (!response.ok) {
    throw new Error("Backend bağlantısı başarısız");
  }

  return response.text();
}

export async function getUsers() {
  const response = await fetch(`${API_URL}/api/users`);

  if (!response.ok) {
    throw new Error("Kullanıcılar alınamadı");
  }

  return response.json();
}