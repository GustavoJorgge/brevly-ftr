import { api } from "./client";
import type { getLinkRequest, getLinkResponse } from "./get-link";

export async function removeLink({
  shortLink,
}: getLinkRequest): Promise<getLinkResponse> {
  const response = await api.get(`/short/${shortLink}`);

  return response.data;
}
