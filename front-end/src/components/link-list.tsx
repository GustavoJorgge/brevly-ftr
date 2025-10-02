import { useLink } from "../store/link";
import { LinkListHeader } from "./link-list-header";
import { LinkUnique } from "./link-list-unique";
import { useQuery } from "@tanstack/react-query";
import { getAllLinks } from "../api/get-link";

export function LinkList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["links"],
    queryFn: getAllLinks,
  });
  console.log(data);

  if (isLoading) {
    return (
      <div className="bg-white max-w-[700px] min-w-[300px] w-full rounded-lg p-8 flex justify-center">
        <span>Carregando links...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white max-w-[700px] min-w-[300px] w-full rounded-lg p-8 flex justify-center text-red-500">
        <span>Erro ao carregar links</span>
      </div>
    );
  }

  const isLinkListEmpty = !data?.links?.length;

  return (
    <div className="bg-white max-w-[700px] min-w-[300px] w-full rounded-lg p-8 flex flex-col gap-2">
      <LinkListHeader />

      {isLinkListEmpty ? (
        <div className="flex flex-col items-center gap-4">
          <img
            src="/icons/link.svg"
            alt="Link icon"
            className="mt-4 w-8 h-8 grayscale opacity-50"
          />
          <span className="text-sm text-gray-400 font-semibold">
            AINDA NÃO EXISTEM LINKS CADASTRADOS
          </span>
        </div>
      ) : (
        <div className="flex flex-col max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
          {data.links.map((link) => (
            <LinkUnique
              key={link.urlId}
              link={{
                originalUrl: link.originalUrl,
                shortUrl: link.shortUrl,
                qtdAcesso: link.qtdAcesso,
              }}
              linkId={link.urlId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
