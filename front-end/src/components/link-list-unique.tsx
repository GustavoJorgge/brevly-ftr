import { CopyIcon, TrashIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "./ui/button";
import { useLink, type Link } from "../store/link";

interface LinkUniqueProps {
  link: Link;
}

export function LinkUnique({ link }: LinkUniqueProps) {
  return (
    <div className="p-2 rounded-lg flex gap-4 overflow-hidden items-center justify-between">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-[18px] text-blue-900 font-medium flex items-center gap-1">
          brev.ly/{link.shortUrl}
        </span>
        <span className="text-xxs text-gray-500 font-semibold flex gap-1.5 items-center">
          {link.url}
        </span>
      </div>
      <div className=" flex">
        <span className="text-zinc-500 text-xxs">{link.qtdAcesso} acessos</span>
      </div>

      <div className="flex gap-2">
        <Button className="bg-gray-200 rounded-lg p-2">
          <CopyIcon className="size-5 text-gray-600 " strokeWidth={1.5} />
          <span className="sr-only">Copia URL encurtada</span>
        </Button>
        <Button className="bg-gray-200 rounded-lg p-2">
          <TrashIcon className="size-5 text-gray-600  " strokeWidth={1.5} />
          <span className="sr-only">Download dos Links em CSV</span>
        </Button>
      </div>
    </div>
  );
}
