import { api } from "./client";

interface AddLinkRequest {
  originalUrl: string;
  shortUrl: string;
}

export async function addLinks({ originalUrl, shortUrl }: AddLinkRequest) {
  const response = await api.post(
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

  return response;
}
