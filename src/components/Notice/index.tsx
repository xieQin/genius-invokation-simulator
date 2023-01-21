import { useTimeout } from "@/hooks";

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
  const { message, callback, timeout = 1200 } = props;
  useTimeout(() => {
    callback && callback();
  }, timeout);

  return <>{message && <div className={styles.Notice}>{message}</div>}</>;
}
