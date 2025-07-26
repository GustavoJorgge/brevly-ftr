import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./pages/home";
import { Redirect } from "./pages/redirect";

const queryClient = new QueryClient();

export function App() {
  return (
    <main className="h-dvh flex flex-col items-center justify-center p-10">
      <QueryClientProvider client={queryClient}>
        <Home />
        {/* <Redirect /> */}
      </QueryClientProvider>
    </main>
  );
}
