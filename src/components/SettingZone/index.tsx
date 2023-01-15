import { useGameStore } from "@/stores";

import styles from "./index.module.css";

export default function SettingZone() {
  const { toggleDeckStatus } = useGameStore();
  return (
    <div
      role="button"
      tabIndex={0}
      className={styles.Settings}
      onKeyDown={() => toggleDeckStatus()}
      onClick={() => toggleDeckStatus()}
    ></div>
  );
}
