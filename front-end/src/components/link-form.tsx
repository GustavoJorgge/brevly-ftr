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
import { useState } from "react";

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

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
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

  const originalUrlValue = watch("originalUrl");

  const isDisabled = isSubmitting || !originalUrlValue;

  async function handleSubmitForm(data: AddLinkInput) {
    addLinkMutation({
      originalUrl: data.originalUrl,
      shortUrl: data.shortUrl,
    });
  }

  return (
    <main className="w-full max-w-[480px] sm:min-w-80 p-8 flex flex-col bg-white rounded-lg">
      <h2 className="flex text-xl mb-3 font-bold">Novo link</h2>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-4"
      >
        <div>
          <Label
            text="Link original"
            isFocused={focusedField === "originalUrl"}
            hasError={!!errors.originalUrl}
          />
          <Input
            type="text"
            placeholder="https://exemplo.com"
            error={errors.originalUrl?.message || ""}
            disabled={isSubmitting}
            {...register("originalUrl", {
              onBlur: () => setFocusedField(null),
            })}
            onFocus={() => setFocusedField("originalUrl")}
          />
        </div>

        <div>
          <Label
            text="Link encurtado"
            isFocused={focusedField === "shortUrl"}
            hasError={!!errors.shortUrl}
          />
          <Input
            prefix="brevy.ly/"
            error={errors.shortUrl?.message || ""}
            disabled={isSubmitting}
            {...register("shortUrl", {
              onBlur: () => setFocusedField(null),
            })}
            onFocus={() => setFocusedField("shortUrl")}
          />
        </div>

        <Button
          type="submit"
          disabled={isDisabled}
          className={
            isDisabled
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:bg-blue-800"
          }
        >
          {isSubmitting ? "Salvando..." : "Salvar Link"}
        </Button>
      </form>
    </main>
  );
}
