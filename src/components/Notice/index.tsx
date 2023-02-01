import { useTimeout } from "@/hooks";
import { PlayerPosition } from "@/models";
import { useGameStore } from "@/stores";

import styles from "./index.module.css";

export const NoticeText = (props: { message: React.ReactNode | string }) => {
  const { message } = props;
  const { current } = useGameStore();
  return (
    <>
      {message && (
        <div
          className={[
            styles.Notice,
            current === PlayerPosition.Opponent ? styles.Opponent : "",
          ].join(" ")}
        >
          {message}
        </div>
      )}
    </>
  );
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

  return <>{message && <NoticeText message={message} />}</>;
}
