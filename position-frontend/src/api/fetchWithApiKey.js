const API = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchWithApiKey(path, options = {}) {
  const apiKey = API_KEY;

  const headers = {
    "X-API-KEY": apiKey,
    ...(options.headers || {}),
  };

  const finalOptions = {
    ...options,
    headers,
  };

  const url = `${API}${path}`;

  try {
    const response = await fetch(url, finalOptions);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (err) {
    console.error("Error en fetchWithApiKey:", err);
    throw err;
  }
}
