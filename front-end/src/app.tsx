import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./pages/home";
import { Redirect } from "./pages/redirect";
import { NotFound } from "./pages/NotFound";
import { Route, Routes, BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

export function App() {
  return (
    <main className="h-dvh flex flex-col items-center justify-center p-10 overflow-auto">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:shortLink" element={<Redirect />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </main>
  );
}
