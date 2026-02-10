const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";
  let data = null;

  if (contentType.includes("application/json")) {
    data = await response.json();
  } else {
    const text = await response.text();
    data = { message: text || "Respuesta no JSON" };
  }

  if (!response.ok) {
    const backendErrors =
      data?.errors && typeof data.errors === "object"
        ? Object.values(data.errors).flat().join(" | ")
        : null;

    throw new Error(
      backendErrors || data?.message || `Error ${response.status}`
    );
  }

  return data;
}

export async function getUsuarios() {
  const data = await request(`${API_BASE}/usuarios`);
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data; // por si algún día paginás
  return [];
}

export async function createUsuario(payload) {
  return request(`${API_BASE}/usuarios`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateUsuario(id, payload) {
  return request(`${API_BASE}/usuarios/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteUsuario(id) {
  return request(`${API_BASE}/usuarios/${id}`, {
    method: "DELETE",
  });
}
