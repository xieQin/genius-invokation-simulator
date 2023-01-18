import { useRoutes } from "react-router-dom";

import { useRoutesConfig } from "./config";

export const Routes = () => {
  const config = useRoutesConfig();
  const elements = useRoutes(config);

  return elements;
};
