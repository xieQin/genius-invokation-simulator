import { Outlet } from "react-router-dom";

import styles from "./index.module.css";

export default function Container() {
  return (
    <div className={styles.Container}>
      <Outlet />
    </div>
  );
}
