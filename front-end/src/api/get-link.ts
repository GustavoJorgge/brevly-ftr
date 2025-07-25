import { api } from "./client";

export interface getAllLinksResponse {
  links: {
    id: string;
    originalLink: string;
    shortLink: string;
    accessCount: number;
  }[];
}

export async function getAllLinks(): Promise<getAllLinksResponse["links"]> {
  const response = await api.get("/links");
  return response.data.links;
}

export interface getLinkRequest {
  shortLink: string;
}

export interface getLinkResponse {
  id: string;
  originalLink: string;
  accessCount: number;
}

export async function getLink({
  shortLink,
}: getLinkRequest): Promise<getLinkResponse> {
  const response = await api.get(`/short/${shortLink}`);

  return response.data;
}
