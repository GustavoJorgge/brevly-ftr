import { CopyIcon, TrashIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "./ui/button";
import { useLink, type Link } from "../store/link";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLink } from "../api/remove-link";

interface LinkUniqueProps {
  link: Link;
  linkId: string;
}

export function LinkUnique({ link, linkId }: LinkUniqueProps) {
  const deleteLocalLink = useLink((state) => state.deleteLink);
  const queryClient = useQueryClient();

  const { mutate: deleteLinkMutation, isPending } = useMutation({
    mutationFn: () => deleteLink(link.shortUrl),
    onSuccess: () => {
      deleteLocalLink(linkId);
      queryClient.invalidateQueries({ queryKey: ["links"] });
      toast.success("Link removido com sucesso!");
    },
    onError: (error: any) => {
      if (error.response?.status === 404) {
        toast.error("Link não encontrado", {
          description: error.response.data.message,
        });
      } else {
        toast.error("Erro ao remover link", {
          description: "Não foi possível remover o link. Tente novamente.",
        });
      }
    },
  });

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
    deleteLinkMutation();
  }

  return (
    <div className="p-1 rounded-lg flex gap-2 sm:gap-4 items-center">
      <div className="flex flex-col gap-1 overflow-hidden flex-1">
        <a
          href={`${link.shortUrl}`}
          className="text-xs sm:text-[18px] text-blue-900 font-medium hover:underline"
        >
          {window.location.origin}/{link.shortUrl}
        </a>
        <span className="text-[10px] sm:text-xs text-gray-500 font-semibold flex gap-1.5">
          {link.url}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] sm:text-xs text-zinc-500">
          {link.qtdAcesso} acessos
        </span>
      </div>

      <div className="flex gap-1 sm:gap-2">
        <Button
          className="bg-gray-200 rounded-lg p-1 sm:p-2 border-2 border-gray-200 hover:border-2 hover:border-blue-700"
          onClick={handleCopyLink}
        >
          <CopyIcon className="size-4 sm:size-5 text-gray-600" strokeWidth={1.5} />
          <span className="sr-only">Copia URL encurtada</span>
        </Button>
        <Button
          className="bg-gray-200 rounded-lg p-1 sm:p-2 border-2 border-gray-200 hover:border-blue-700"
          onClick={handleDeleteLink}
          disabled={isPending}
        >
          <TrashIcon className="size-4 sm:size-5 text-gray-600" strokeWidth={1.5} />
          <span className="sr-only">Deletar Link encurtado</span>
        </Button>
      </div>
    </div>
  );
}
