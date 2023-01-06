import styles from "./index.module.css";

export default function Notice(props: { message: React.ReactNode }) {
  const { message } = props;
  return <div className={styles.Notice}>{message}</div>;
}
