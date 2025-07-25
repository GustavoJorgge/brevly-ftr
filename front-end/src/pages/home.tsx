import { LinkList } from "../components/link-list";
import { MainLinks } from "../components/main-links";
import { Logo } from "../shared/logo";

export function Home() {
  return (
    <div className="flex flex-col h-dvh w-full items-center justify-center">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <a href="/" title="brev.ly">
            <Logo />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
          <div className="w-full max-w-md">
            <MainLinks />
          </div>

          <div className="w-full">
            <LinkList />
          </div>
        </div>
      </div>
    </div>
  );
}
