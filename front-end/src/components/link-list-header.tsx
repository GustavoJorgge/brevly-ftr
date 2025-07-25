import { DownloadSimpleIcon, SpinnerIcon } from "@phosphor-icons/react/ssr";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { exportCSV } from "../api/export-csv";
import { toast } from "sonner";

export function LinkListHeader() {
  const { mutateAsync: exportCSVquery, isPending: isLoadingCSVDownload } =
    useMutation({
      mutationFn: exportCSV,
      onSuccess: () => {
        toast.success("CSV baixado com sucesso.");
      },
      onError: (error) => {
        console.log(error);
        toast.error("Erro ao baixar CSV. Por favor, tente novamente.");
      },
    });

  async function handleDownloadCSV() {
    const downloadUrl = await exportCSVquery();

    const anchor = document.createElement("a");
    anchor.href = downloadUrl.reportUrl;
    anchor.download = "export";
    anchor.click();

    anchor.remove();
  }

  return (
    <div className="flex justify-between items-center border-b border-gray-400 border-grayscale-200 pb-4">
      <h2 className="text-xl font-bold">Meus links</h2>
      <Button
        onClick={handleDownloadCSV}
        className="flex bg-gray-200 text-gray-400 w-1xs gap-2 hover:bg-gray-300 hover:text-gray-500"
        disabled={isLoadingCSVDownload}
      >
        <DownloadSimpleIcon size={20} />
        <p className="text-xs font-semibold text-grayscale-500">
          <span className="sr-only">Baixar links em CSV</span>
          {isLoadingCSVDownload ? "Baixando..." : "Baixar CSV"}
        </p>
      </Button>
    </div>
  );
}
