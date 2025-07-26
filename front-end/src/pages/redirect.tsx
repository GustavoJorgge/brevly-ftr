import { IconLogo } from "../shared/icon-logo";

export function Redirect() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-200 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-lg text-center shadow-sm">
        <div className="flex justify-center mb-6">
          <div className="w-10 h-10 flex items-center justify-center">
            <IconLogo />
          </div>
        </div>
        <h1 className="text-lg font-medium text-zinc-900 mb-4">
          Redirecionando...
        </h1>
        <p className="text-sm text-zinc-600 leading-relaxed">
          O link será aberto automaticamente em alguns instantes.
          <br />
          Não foi redirecionado?{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline transition-colors"
          >
            Acesse aqui
          </a>
        </p>
      </div>
    </div>
  );
}
