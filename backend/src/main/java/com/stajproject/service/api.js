const API_URL = "http://localhost:8080";

// Backend bağlantısını kontrol et
export async function getHealth() {
  const response = await fetch(`${API_URL}/api/health`);

  if (!response.ok) {
    throw new Error("Backend bağlantısı başarısız");
  }

  return response.text();
}

// Kullanıcıları getir
export async function getUsers() {
  const response = await fetch(`${API_URL}/api/users`);

  if (!response.ok) {
    throw new Error("Kullanıcılar alınamadı");
  }

  return response.json();
}

// Projeleri getir
export async function getProjects() {
  const response = await fetch(`${API_URL}/api/projects`);

  if (!response.ok) {
    throw new Error("Projeler alınamadı");
  }

  return response.json();
}

// Yeni proje oluştur
export async function createProject(project) {
  const response = await fetch(`${API_URL}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });

  if (!response.ok) {
    throw new Error("Proje oluşturulamadı");
  }

  return response.json();
}

// Projeyi güncelle
export async function updateProject(id, project) {
  const response = await fetch(`${API_URL}/api/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });

  if (!response.ok) {
    throw new Error("Proje güncellenemedi");
  }

  return response.json();
}

// Projeyi sil
export async function deleteProject(id) {
  const response = await fetch(
    `${API_URL}/api/projects/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Proje silinemedi");
  }

  return true;
}

// Haftalık raporları getir
export async function getWeeklyReports() {
  const response = await fetch(`${API_URL}/api/weekly-reports`);

  if (!response.ok) {
    throw new Error("Haftalık raporlar alınamadı");
  }

  return response.json();
}

// Yeni haftalık rapor oluştur
export async function createWeeklyReport(report) {
  const response = await fetch(`${API_URL}/api/weekly-reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(report),
  });

  if (!response.ok) {
    throw new Error("Haftalık rapor oluşturulamadı");
  }

  return response.json();
}

// Haftalık raporu güncelle
export async function updateWeeklyReport(id, report) {
  const response = await fetch(
    `${API_URL}/api/weekly-reports/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(report),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    console.error(
      "PUT Weekly Report Hatası:",
      response.status,
      errorText
    );

    throw new Error(
      `Rapor güncellenemedi. HTTP ${response.status}`
    );
  }

  return response.json();
}

// Haftalık raporu sil
export async function deleteWeeklyReport(id) {
  const response = await fetch(
    `${API_URL}/api/weekly-reports/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Rapor silinemedi");
  }

  return true;
}