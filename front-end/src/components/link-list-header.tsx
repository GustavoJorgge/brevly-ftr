import { DownloadSimpleIcon, SpinnerIcon } from "@phosphor-icons/react/ssr";
import { Button } from "./ui/button";

export function LinkListHeader() {
  return (
    <div className="flex justify-between items-center border-b border-gray-400 border-grayscale-200 pb-4">
      <h2 className="text-xl font-bold">Meus links</h2>
      <Button className="flex bg-gray-200 text-gray-500 w-1xs">
        <DownloadSimpleIcon size={20} />
        {/* {isGenerating ? (
            <span className="animate-spin">
              <SpinnerIcon size={16} className="fill-grayscale-500" />
            </span>
          ) : (
            <DownloadSimpleIcon size={16} className="fill-grayscale-500" />
          )} */}
        <p className="text-xs font-semibold text-grayscale-500">Baixar CSV</p>
      </Button>
    </div>
  );
}
