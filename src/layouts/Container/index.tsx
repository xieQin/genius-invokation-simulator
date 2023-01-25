import { Outlet, useLocation } from "react-router-dom";

import styles from "./index.module.css";

export default function Container() {
  const { pathname } = useLocation();
  return (
    <div
      className={styles.Container}
      style={{ top: pathname === "/game" ? 0 : "60px" }}
    >
      <Outlet />
    </div>
  );
}
