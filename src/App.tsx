import { Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import setupIndexedDB from "use-indexeddb";

import { idbConfig } from "./configs/indexdb";
import { Routes } from "./routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

export default function App() {
  useEffect(() => {
    setupIndexedDB(idbConfig)
      .then(() => console.log("db init success"))
      .catch(e => console.error("db error / unsupported", e));
  });
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Suspense>
          <Routes />
        </Suspense>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
