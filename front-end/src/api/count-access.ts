import { api } from "./client";

export interface CountAccessResponse {
  originalUrl: string;
  qtdAcesso: number;
}

export async function countAccess(shortUrl: string): Promise<CountAccessResponse> {
  const response = await api.post<CountAccessResponse>(`/links/${shortUrl}/access`);
  return response.data;
}