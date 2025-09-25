import { create } from "zustand";

export type Link = {
  url?: string;
  originalUrl?: string;
  shortUrl: string;
  qtdAcesso: number;
};

type LinkState = {
  links: Map<string, Link>;
  addLink: (
    urlList: { originalUrl: string; shortUrl: string; qtdAcesso: number }[]
  ) => void;
  deleteLink: (linkId: string) => void;
};

export const useLink = create<LinkState>((set, get) => {
  function addLink(
    urlLink: { originalUrl: string; shortUrl: string; qtdAcesso: number }[]
  ) {
    set((state) => {
      const newLinks = new Map(state.links);

      for (const item of urlLink) {
        const linkId = crypto.randomUUID();

        const link: Link = {
          url: item.originalUrl,
          shortUrl: item.shortUrl,
          qtdAcesso: item.qtdAcesso,
        };

        newLinks.set(linkId, link);
      }

      return { links: newLinks };
    });
  }

  function deleteLink(linkId: string) {
    set((state) => {
      const newLinks = new Map(state.links);
      newLinks.delete(linkId);
      return { links: newLinks };
    });
  }

  return {
    links: new Map(),
    addLink,
    deleteLink,
  };
});
