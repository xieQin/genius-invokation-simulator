import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import { Routes } from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes />
      </Suspense>
    </BrowserRouter>
  );
}
