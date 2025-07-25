import { z } from "zod";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { GerarLink } from "../api/gerar-link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as ReactHookForm from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Button } from "./ui/button";

// @ts-ignore
const { useForm } = ReactHookForm;

const geraUrlInput = z.object({
  originalUrl: z.string(),
  shortUrl: z.string(),
});

type AddLinkInput = z.infer<typeof geraUrlInput>;

export function LinkForm() {
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
    onSuccess: () => {
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
    addLinkMutation({
      originalUrl: data.originalUrl,
      shortUrl: data.shortUrl,
    });
  }

  return (
    <main className="w-full max-w-[480px] sm:min-w-80 p-6 sm:p-8 flex flex-col justify-center bg-white rounded-lg">
      <h2 className="flex text-xl text-grayscale-600 mb-3">Novo link</h2>
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
