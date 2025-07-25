import { LinkList } from "../components/link-list";
import { LinkForm } from "../components/link-form";
import { Logo } from "../shared/logo";

export function Home() {
  return (
    <div className="flex flex-col h-dvh w-full items-center justify-around">
      <div className="max-w-5xl mx-auto">
        <div className="mb-7">
          <a href="/" title="brev.ly">
            <Logo />
          </a>
        </div>

        <div className="grid lg:grid-cols-2 item">
          <div className="">
            <LinkForm />
          </div>

          <div className="w-full">
            <LinkList />
          </div>
        </div>
      </div>
    </div>
  );
}
