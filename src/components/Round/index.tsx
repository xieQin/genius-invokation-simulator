import { useState } from "react";

import { useTimeout } from "@/hooks";
import { PlayerPositionMap } from "@/models";
import { useGameStore } from "@/stores";

import styles from "./index.module.css";

export default function Round(props: { callback: () => void }) {
  const { turn, current } = useGameStore();
  const [show, setShow] = useState(true);
  const { callback } = props;

  useTimeout(() => {
    setShow(false);
    callback && callback();
  }, 1500);

  if (!show) return <></>;
  return (
    <div className={styles.Round}>
      <div className={styles.RoundLayer}></div>
      <div className={styles.RoundContent}>
        <div className={styles.RoundContentTitle}>
          {PlayerPositionMap[current]} attack first
        </div>
        <div className={styles.RoundContentText}>Round {turn}</div>
      </div>
    </div>
  );
}
