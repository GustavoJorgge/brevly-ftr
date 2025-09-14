import { CopyIcon, TrashIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "./ui/button";
import { useLink, type Link } from "../store/link";
import { toast, Toaster } from "sonner";

interface LinkUniqueProps {
  link: Link;
  linkId: string;
}

export function LinkUnique({ link, linkId }: LinkUniqueProps) {
  const deleteLink = useLink((state) => state.deleteLink);

  function handleCopyLink() {
    const shortUrl = `${window.location.origin}/${link.shortUrl}`;

    navigator.clipboard
      .writeText(shortUrl)
      .then(() => {
        toast.success("Link copiado com sucesso!", {
          description: `O link foi copiado para a área de transferência.`,
        });
      })
      .catch(() => {
        toast.error("Erro ao copiar link");
      });
  }

  function handleDeleteLink() {
    deleteLink(linkId);
    toast.success("Link removido com sucesso!");
  }

  return (
    <div className="p-2 rounded-lg flex gap-4 overflow-hidden items-center justify-between">
      <Toaster richColors position="bottom-right" />
      <div className="flex flex-col gap-1">
        <a
          href={`${link.shortUrl}`}
          className="text-xs text-[18px] text-blue-900 font-medium flex items-center gap-1 hover:underline"
        >
          {window.location.origin}/{link.shortUrl}
        </a>
        <span className="text-xxs text-gray-500 font-semibold flex gap-1.5">
          {link.url}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-zinc-500 text-xxs">{link.qtdAcesso} acessos</span>
      </div>

      <div className="flex gap-2">
        <Button
          className="bg-gray-200 rounded-lg p-2 border-2 border-gray-200 hover:border-2 hover:border-blue-700"
          onClick={handleCopyLink}
        >
          <CopyIcon className="size-5 text-gray-600" strokeWidth={1.5} />
          <span className="sr-only">Copia URL encurtada</span>
        </Button>
        <Button
          className="bg-gray-200 rounded-lg p-2 border-2 border-gray-200 hover:border-blue-700"
          onClick={handleDeleteLink}
        >
          <TrashIcon className="size-5 text-gray-600" strokeWidth={1.5} />
          <span className="sr-only">Deletar Link encurtado</span>
        </Button>
      </div>
    </div>
  );
}
