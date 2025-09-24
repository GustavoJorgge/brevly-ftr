import { LinkList } from "../components/link-list";
import { LinkForm } from "../components/link-form";
import { Logo } from "../shared/logo";

export function Home() {
  return (
    <div className="flex flex-col h-dvh w-full items-center justify-around">
      <div className="max-w-5xl mx-auto w-full px-4">
        <div className="mb-7">
          <a href="/" title="brev.ly">
            <Logo />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="md:col-span-1">
            <LinkForm />
          </div>

          <div className="md:col-span-1 lg:col-span-2">
            <LinkList />
          </div>
        </div>
      </div>
    </div>
  );
}
