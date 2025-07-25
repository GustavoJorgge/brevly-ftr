import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function MainLinks() {
  return (
    <main className="w-full max-w-[480px] sm:min-w-80 p-6 sm:p-8 flex flex-col justify-center bg-white rounded-lg">
      <h2 className="flex text-xl mb-5 font-bold">Novo link</h2>
      <form className="flex flex-col gap-1">
        <Label text="Link original" />
        <Input placeholder="https://exemplo.com" />

        <Label text="Link encurtado" />
        <Input placeholder="https://brev.ly/url" />

        <Button>Salvar Link</Button>
      </form>
    </main>
  );
}
