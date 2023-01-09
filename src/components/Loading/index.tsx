import styles from "./index.module.css";

export default function Loading(props: { text?: string }) {
  const { text } = props;
  return <div className={styles.Loading}>{text}</div>;
}
