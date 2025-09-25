import { api } from "./client";

export interface GetAllLinksResponse {
  links: {
    urlId: string;
    originalUrl: string;
    shortUrl: string;
    qtdAcesso: number;
    createdAt: string;
  }[];
}

export async function getAllLinks(): Promise<GetAllLinksResponse> {
  const response = await api.get<GetAllLinksResponse>("/links");
  return response.data;
}

export interface GetLinkRequest {
  shortUrl: string;
}

export interface GetLinkResponse {
  urlId: string;
  originalUrl: string;
  shortUrl: string;
  qtdAcesso: number;
  createdAt: string;
}

export async function getLink({
  shortUrl,
}: GetLinkRequest): Promise<GetLinkResponse> {
  const response = await api.get<GetLinkResponse>(`/links/short/${shortUrl}`);
  return response.data;
}
