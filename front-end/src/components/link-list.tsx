import { useLink } from "../store/link";
import { LinkListHeader } from "./link-list-header";
import { LinkUnique } from "./link-list-unique";
import linkIcon from "../../public/icons/link.svg";

export function LinkList() {
  const { links } = useLink();

  console.log("Links renderizados:", [...links.entries()]);

  const isLinkListEmpty = links.size == 0;

  return (
    <div className="bg-white w-full rounded-lg p-8 flex flex-col gap-2">
      <LinkListHeader />

      {isLinkListEmpty ? (
        <div className="flex flex-col items-center gap-4">
          <img
            src={linkIcon}
            alt="Link icon"
            className="mt-4 w-8 h-8 grayscale opacity-50"
          />
          <span className="text-sm text-gray-400 font-semibold">
            AINDA NÃO EXISTEM LINKS CADASTRADOS
          </span>
        </div>
      ) : (
        <div className="flex flex-col">
          {Array.from(links.entries()).map(([linkId, link]) => (
            <LinkUnique key={linkId} link={link} linkId={linkId} />
          ))}
        </div>
      )}
    </div>
  );
}
