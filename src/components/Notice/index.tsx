import { useEffect, useRef } from "react";

import styles from "./index.module.css";

export default function Notice(props: {
  message: React.ReactNode;
  cb?: () => void;
}) {
  const { message, cb } = props;
  const timeout: { current: number | null } = useRef(null);
  useEffect(() => {
    timeout.current = window.setTimeout(() => {
      cb && cb();
    }, 2000);
    return () => {
      clearTimeout(timeout.current as number);
    };
  });

  return <>{message && <div className={styles.Notice}>{message}</div>}</>;
}
