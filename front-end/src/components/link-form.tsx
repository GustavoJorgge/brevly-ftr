import { z } from "zod";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { GerarLink } from "../api/gerar-link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as ReactHookForm from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Button } from "./ui/button";
import { useLink } from "../store/link";

// @ts-ignore
const { useForm } = ReactHookForm;

const geraUrlInput = z.object({
  originalUrl: z.url("Informe uma url válida."),
  shortUrl: z
    .string()
    .regex(
      /^[a-zA-Z0-9]+$/,
      "Informe uma url minúscula e sem espaços/caracteres especiais."
    ),
});

type AddLinkInput = z.infer<typeof geraUrlInput>;

export function LinkForm() {
  const { addLink } = useLink();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddLinkInput>({
    resolver: zodResolver(geraUrlInput),
    defaultValues: {
      originalUrl: "",
      shortUrl: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate: addLinkMutation } = useMutation({
    mutationFn: GerarLink,
    onSuccess: (data) => {
      console.log("Dados da API", data);
      addLink([
        {
          originalUrl: data.originalUrl,
          shortUrl: data.urlNova,
          qtdAcesso: data.qtdAcesso,
        },
      ]);
      queryClient.invalidateQueries({ queryKey: ["links"] });
      reset();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.error("Erro:", error.response?.data.error);
      }
    },
  });

  async function handleSubmitForm(data: AddLinkInput) {
    console.log("botao clicado");
    console.log(data);
    addLinkMutation({
      originalUrl: data.originalUrl,
      shortUrl: data.shortUrl,
    });
  }

  return (
    <main className="w-full max-w-[480px] sm:min-w-80 p-8 flex flex-col bg-white rounded-lg">
      <h2 className="flex text-xl mb-3 font-bold">Novo link</h2>
      <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col">
        <Label text="Link original" />
        <Input
          type="text"
          placeholder="https://exemplo.com"
          error={errors.originalUrl?.message || ""}
          disabled={isSubmitting}
          {...register("originalUrl")}
        />

        <Label text="Link encurtado" />
        <Input
          prefix="brevy.ly/"
          error={errors.shortUrl?.message || ""}
          disabled={isSubmitting}
          {...register("shortUrl")}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar Link"}
        </Button>
      </form>
    </main>
  );
}
