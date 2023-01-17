import { useEffect, useRef, useState } from "react";

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
  const [notice, setNotice] = useState(message);
  const timer: { current: number | null } = useRef(null);
  useEffect(() => {
    timer.current = window.setTimeout(
      () => {
        setNotice("");
        callback && callback();
      },
      timeout ? timeout : 1200
    );
    return () => {
      clearTimeout(timer.current as number);
    };
  });

  return <>{notice && <div className={styles.Notice}>{notice}</div>}</>;
}
