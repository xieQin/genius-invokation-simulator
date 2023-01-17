import { useEffect, useRef } from "react";

import styles from "./index.module.css";

export const NoticeText = (props: { message: React.ReactNode | string }) => {
  const { message } = props;
  return <>{message && <div className={styles.Notice}>{message}</div>}</>;
};

export default function Notice(props: {
  message: React.ReactNode | string;
  callback?: () => void;
  timeout?: number;
}) {
  const { message, callback, timeout } = props;
  const timer: { current: number | null } = useRef(null);
  useEffect(() => {
    timer.current = window.setTimeout(
      () => {
        callback && callback();
      },
      timeout ? timeout : 1200
    );
    return () => {
      clearTimeout(timer.current as number);
    };
  });

  return <>{message && <div className={styles.Notice}>{message}</div>}</>;
}
