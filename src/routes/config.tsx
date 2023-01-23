import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

import SettingsPage from "@/views/Settings";
import Layout from "@/layouts";

const HomePage = lazy(() => import("@/views/Home"));
const GamePage = lazy(() => import("@/views/Game"));
const DeckPage = lazy(() => import("@/views/Deck"));

export const useRoutesConfig = () => {
  const routes: RouteObject[] = [
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "home",
          element: <HomePage />,
        },
        {
          path: "game",
          element: <GamePage />,
        },
        {
          path: "deck",
          element: <DeckPage />,
        },
        {
          path: "settings",
          element: <SettingsPage />,
        },
      ],
    },
    {
      path: "404",
      element: <GamePage />,
    },
    {
      path: "*",
      element: <Navigate to="/404" />,
    },
  ];
  return routes;
};
