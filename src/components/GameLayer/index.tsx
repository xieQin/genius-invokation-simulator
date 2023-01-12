import styles from "@/assets/styles/game.module.css";

export default function GameLayer(props: {
  element?: React.ReactNode | string;
  onConfirm?: () => void;
  onCancel?: () => void;
}) {
  const { element, onConfirm, onCancel } = props;
  return (
    <div
      aria-hidden="true"
      className={styles.GameLayer}
      onClick={() => {
        onCancel && onCancel();
      }}
    >
      <div className={styles.GameModalLayerText}>{element}</div>
      <div className={styles.GameModalLayer}></div>
      {onConfirm && (
        <div
          className={styles.GameLayerBtns}
          aria-hidden="true"
          style={{ bottom: 80 }}
          onClick={() => {
            onConfirm();
          }}
        >
          <div className={styles.ConfirmIcon}></div>
        </div>
      )}
    </div>
  );
}
