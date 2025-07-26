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
    data: { urlId }, // axios permite passar o body via `data` para DELETE
  });

  return response.data;
}
