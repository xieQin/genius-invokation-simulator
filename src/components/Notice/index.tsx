import { useEffect, useRef } from "react";

import styles from "./index.module.css";

export default function Notice(props: {
  message: React.ReactNode;
  cb?: () => void;
}) {
  const { message, cb } = props;
  const timer: any = useRef();
  useEffect(() => {
    timer.current = window.setTimeout(() => {
      cb && cb();
      console.log("time out");
    }, 2000);
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return <>{message && <div className={styles.Notice}>{message}</div>}</>;
}
