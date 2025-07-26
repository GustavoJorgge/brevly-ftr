// api/get-link-by-slug.ts
import { api } from "./client";

export interface getLinkBySlugRequest {
  shortUrl: string;
}

export interface getLinkBySlugResponse {
  id: string;
  originalUrl: string;
  accessCount: number;
}

export async function getLinkBySlug(
  shortUrl: string | undefined
): Promise<getLinkBySlugResponse> {
  if (!shortUrl) {
    throw new Error("Short URL is required");
  }

  const response = await api.get(`/short/${shortUrl}`);

  return response.data;
}
