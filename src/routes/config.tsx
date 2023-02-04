import { Navigate, RouteObject } from "react-router-dom";

import Layout from "@/layouts";
import DeckPage from "@/views/Deck";
import GamePage from "@/views/Game";
import HomePage from "@/views/Home";
import SettingsPage from "@/views/Settings";

export const useRoutesConfig = () => {
  const routes: RouteObject[] = [
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "/",
          element: <HomePage />,
        },
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
      path: "/index.html",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
      ],
    },
    {
      path: "404",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" />,
    },
  ];
  return routes;
};
