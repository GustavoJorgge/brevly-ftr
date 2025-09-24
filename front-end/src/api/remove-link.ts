import { api } from "./client";

interface DeleteLinkRequest {
  urlId: string;
}

interface DeleteLinkResponse {
  urlId: string;
}

export async function removeLink({
  urlId,
}: DeleteLinkRequest): Promise<DeleteLinkResponse> {
  const response = await api.delete("/delete", {
    data: { urlId },
  });

  return response.data;
}

// Função deletar link por short URL
export async function deleteLink(shortUrl: string): Promise<void> {
  await api.delete(`/links/short/${shortUrl}`);
}
