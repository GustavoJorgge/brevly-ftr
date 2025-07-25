import { api } from "./client";

interface AddLinkRequest {
  originalUrl: string;
  shortUrl: string;
}

interface AddLinkResponse {
  originalUrl: string;
  urlNova: string;
  qtdAcesso: number;
}

export async function GerarLink({
  originalUrl,
  shortUrl,
}: AddLinkRequest): Promise<AddLinkResponse> {
  const response = await api.post<AddLinkResponse>(
    "/links",
    {
      originalUrl,
      shortUrl,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}
