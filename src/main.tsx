import "./main.css";
import "@/utils/i18n";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import VConsole from "vconsole";

import ReloadPrompt from "@/components/ReloadPrompt";

import App from "./App";

const vConsole = new VConsole();
const container = document.getElementById("root");
const root = createRoot(container as HTMLDivElement);

root.render(
  <StrictMode>
    <App />
    <ReloadPrompt />
  </StrictMode>
);
