import styles from "./index.module.css";

export default function SettingZone(props: { toggle: () => void }) {
  const { toggle } = props;
  return (
    <div
      role="button"
      tabIndex={0}
      className={styles.Settings}
      onKeyDown={() => toggle()}
      onClick={() => toggle()}
    ></div>
  );
}
