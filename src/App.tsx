import { Suspense, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import setupIndexedDB from "use-indexeddb";

import { idbConfig } from "./configs/indexdb";
import { Routes } from "./routes";

export default function App() {
  useEffect(() => {
    setupIndexedDB(idbConfig)
      .then(() => console.log("db init success"))
      .catch(e => console.error("db error / unsupported", e));
  });
  return (
    <BrowserRouter>
      <Suspense>
        <Routes />
      </Suspense>
    </BrowserRouter>
  );
}
