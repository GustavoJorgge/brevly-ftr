import { LinkList } from "../components/link-list";
import { LinkForm } from "../components/link-form";
import { Logo } from "../shared/logo";

export function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-around">
      <div className="max-w-6xl w-full px-4 justify-center flex flex-col mt-10 mb-10">
        <div className="mb-7">
          <a href="/" title="brev.ly">
            <Logo />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="w-full lg:col-span-2">
            <LinkForm />
          </div>

          <div className="w-full lg:col-span-3">
            <LinkList />
          </div>
        </div>
      </div>
    </div>
  );
}
