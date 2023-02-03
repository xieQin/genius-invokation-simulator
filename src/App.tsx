import { useEffect } from "react";
import setupIndexedDB from "use-indexeddb";

import { idbConfig } from "./configs/indexdb";
import GamePage from "./views/Game";

export default function App() {
  useEffect(() => {
    setupIndexedDB(idbConfig)
      .then(() => console.log("db init success"))
      .catch(e => console.error("db error / unsupported", e));
  });
  return (
    <GamePage />
    // <BrowserRouter>
    //   <Suspense>
    //     <Routes />
    //   </Suspense>
    // </BrowserRouter>
  );
}
