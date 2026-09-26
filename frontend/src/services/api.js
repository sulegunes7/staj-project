const API_URL = "http://localhost:8080";

// =========================
// AUTHENTICATION
// =========================

export function setAuth(username, password) {
  const token = btoa(`${username}:${password}`);

  sessionStorage.setItem("authToken", token);

  // Mevcut backend kullanıcılarının frontend rolünü sakla
  const role = username === "admin" ? "ADMIN" : "USER";
  sessionStorage.setItem("userRole", role);
}

export function clearAuth() {
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("userRole");
}

export function getUserRole() {
  return sessionStorage.getItem("userRole");
}

function getAuthHeaders() {
  const token = sessionStorage.getItem("authToken");

  if (!token) {
    return {};
  }

  return {
    Authorization: `Basic ${token}`,
  };
}

async function apiFetch(url, options = {}) {
  const authHeaders = getAuthHeaders();

  const response = await fetch(url, {
    ...options,
    headers: {
      ...authHeaders,
      ...(options.headers || {}),
    },
  });

  if (response.status === 401) {
    clearAuth();
    throw new Error("Oturum açmanız gerekiyor");
  }

  if (response.status === 403) {
    throw new Error("Bu işlem için yetkiniz yok");
  }

  return response;
}

// =========================
// BACKEND HEALTH
// =========================

export async function getHealth() {
  const response = await apiFetch(`${API_URL}/api/health`);

  if (!response.ok) {
    throw new Error("Backend bağlantısı başarısız");
  }

  return response.text();
}

// =========================
// KULLANICILAR
// =========================

export async function getUsers() {
  const response = await apiFetch(`${API_URL}/api/users`);

  if (!response.ok) {
    throw new Error("Kullanıcılar alınamadı");
  }

  return response.json();
}

// =========================
// PROJELER
// =========================

export async function getProjects() {
  const response = await apiFetch(`${API_URL}/api/projects`);

  if (!response.ok) {
    throw new Error("Projeler alınamadı");
  }

  return response.json();
}

export async function createProject(project) {
  const response = await apiFetch(`${API_URL}/api/projects`, {
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

export async function updateProject(id, project) {
  const response = await apiFetch(`${API_URL}/api/projects/${id}`, {
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

export async function deleteProject(id) {
  const response = await apiFetch(`${API_URL}/api/projects/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Proje silinemedi");
  }

  return true;
}

// =========================
// HAFTALIK RAPORLAR
// =========================

export async function getWeeklyReports() {
  const response = await apiFetch(`${API_URL}/api/weekly-reports`);

  if (!response.ok) {
    throw new Error("Haftalık raporlar alınamadı");
  }

  return response.json();
}

export async function createWeeklyReport(report) {
  const response = await apiFetch(`${API_URL}/api/weekly-reports`, {
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

export async function updateWeeklyReport(id, report) {
  const response = await apiFetch(
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

export async function deleteWeeklyReport(id) {
  const response = await apiFetch(
    `${API_URL}/api/weekly-reports/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Haftalık rapor silinemedi");
  }

  return true;
}

// =========================
// WORK ITEMLAR
// =========================

export async function getWorkItems() {
  const response = await apiFetch(`${API_URL}/api/work-items`);

  if (!response.ok) {
    throw new Error("Work item'lar alınamadı");
  }

  return response.json();
}

export async function getPagedWorkItems({
  page = 0,
  size = 10,
  sortBy = "id",
  direction = "asc",
  projectId,
  reportId,
  status,
  responsible,
  overdue,
  risk,
} = {}) {
  const params = new URLSearchParams();

  params.set("page", page);
  params.set("size", size);
  params.set("sortBy", sortBy);
  params.set("direction", direction);

  if (projectId) {
    params.set("projectId", projectId);
  }

  if (reportId) {
    params.set("reportId", reportId);
  }

  if (status) {
    params.set("status", status);
  }

  if (responsible) {
    params.set("responsible", responsible);
  }

  if (overdue !== undefined && overdue !== "") {
    params.set("overdue", overdue);
  }

  if (risk !== undefined && risk !== "") {
    params.set("risk", risk);
  }

  const response = await apiFetch(
    `${API_URL}/api/work-items/paged?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Work item'lar alınamadı");
  }

  return response.json();
}

export async function createWorkItem(workItem) {
  const response = await apiFetch(`${API_URL}/api/work-items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workItem),
  });

  if (!response.ok) {
    throw new Error("Work item oluşturulamadı");
  }

  return response.json();
}

export async function updateWorkItem(id, workItem) {
  const response = await apiFetch(
    `${API_URL}/api/work-items/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workItem),
    }
  );

  if (!response.ok) {
    throw new Error("Work item güncellenemedi");
  }

  return response.json();
}

export async function deleteWorkItem(id) {
  const response = await apiFetch(
    `${API_URL}/api/work-items/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Work item silinemedi");
  }

  return true;
}

// =========================
// RİSKLER
// =========================

export async function getRisks() {
  const response = await apiFetch(`${API_URL}/api/risks`);

  if (!response.ok) {
    throw new Error("Riskler alınamadı");
  }

  return response.json();
}

export async function createRisk(risk) {
  const response = await apiFetch(`${API_URL}/api/risks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(risk),
  });

  if (!response.ok) {
    throw new Error("Risk oluşturulamadı");
  }

  return response.json();
}

export async function updateRisk(id, risk) {
  const response = await apiFetch(`${API_URL}/api/risks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(risk),
  });

  if (!response.ok) {
    throw new Error("Risk güncellenemedi");
  }

  return response.json();
}

export async function deleteRisk(id) {
  const response = await apiFetch(
    `${API_URL}/api/risks/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Risk silinemedi");
  }

  return true;
}