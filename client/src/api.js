export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export async function fetchCsrfToken() {
  const response = await fetch(`${API_BASE}/api/security/csrf-token`, {
    method: "GET",
    credentials: "include"
  });
  const data = await response.json();
  return data.csrfToken;
}

export async function apiGet(path) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    credentials: "include"
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data;
}

export async function apiPost(path, body) {
  const csrfToken = await fetchCsrfToken();
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "CSRF-Token": csrfToken
    },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data;
}

export async function apiPut(path, body) {
  const csrfToken = await fetchCsrfToken();
  const response = await fetch(`${API_BASE}${path}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "CSRF-Token": csrfToken
    },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data;
}

export async function apiPatch(path, body) {
  const csrfToken = await fetchCsrfToken();
  const response = await fetch(`${API_BASE}${path}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "CSRF-Token": csrfToken
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data;
}
