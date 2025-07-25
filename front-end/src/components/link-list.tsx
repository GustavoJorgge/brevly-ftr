import { LinkIcon } from "@phosphor-icons/react";
import { LinkListHeader } from "./link-list-header";

export function LinkList() {
  return (
    <div className="bg-white w-full  max-w-[400px]  sm:min-w-[500px] p-6 sm:p-8 flex flex-col justify-center rounded-lg">
      <LinkListHeader />

      <div className="flex flex-col items-center justify-center py-4 px-6">
        <LinkIcon size={28} color="#74798B" />
        <p className="text-xs text-gray-500 uppercase mt-3">
          Ainda não existem links cadastrados
        </p>
      </div>
    </div>
  );
}
