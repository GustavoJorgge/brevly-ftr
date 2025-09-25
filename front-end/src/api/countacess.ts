import { api } from "./client";

interface RedirectLinkResponse {
  originalUrl: string;
  qtdAcesso: number;
}

export async function redirectToOriginalUrl(
  shortUrl: string
): Promise<RedirectLinkResponse> {
  const response = await api.get<RedirectLinkResponse>(`/${shortUrl}`);
  return response.data;
}
