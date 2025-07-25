import { api } from "./client";

export async function exportCSV() {
  const response = await api.post("/links/exports");
  return response.data;
}
