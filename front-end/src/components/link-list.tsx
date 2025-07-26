import { useLink } from "../store/link";
import { LinkListHeader } from "./link-list-header";
import { LinkUnique } from "./link-list-unique";

export function LinkList() {
  const { links } = useLink();

  console.log("Links renderizados:", [...links.entries()]);

  const isLinkListEmpty = links.size == 0;

  return (
    <div className="bg-white w-[600px] rounded-lg p-8 flex flex-col gap-2">
      <LinkListHeader />

      {isLinkListEmpty ? (
        <span>Nenhum link adicionado</span>
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
