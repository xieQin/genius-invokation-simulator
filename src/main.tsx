import "./main.css";
import "@/utils/i18n";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import ReloadPrompt from "./ReloadPrompt";

const container = document.getElementById("root");
const root = createRoot(container as HTMLDivElement);

root.render(
  <StrictMode>
    <App />
    <ReloadPrompt />
  </StrictMode>
);
