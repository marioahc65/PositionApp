import { fetchWithApiKey } from "./fetchWithApiKey";

export function getPositions() {
  return fetchWithApiKey("/positions");
}

export function createPosition(data) {
  return fetchWithApiKey("/positions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function deletePosition(id) {
  return fetchWithApiKey(`/positions/${id}`, {
    method: "DELETE",
  });
}

export function getPositionById(id) {
  return fetchWithApiKey(`/positions/${id}`);
}

export function updatePosition(id, data) {
  return fetchWithApiKey(`/positions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
