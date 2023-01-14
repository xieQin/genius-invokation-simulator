import styles from "@/assets/styles/game.module.css";

export default function GameLayer(props: {
  element?: React.ReactNode | string;
  onConfirm?: () => void;
  onCancel?: () => void;
}) {
  const { element, onConfirm, onCancel } = props;
  return (
    <div className={styles.GameLayer}>
      <div
        className={styles.GameModalLayerText}
        aria-hidden="true"
        onClick={() => {
          onCancel && onCancel();
        }}
      >
        {element}
      </div>
      <div
        className={styles.GameModalLayer}
        aria-hidden="true"
        onClick={() => {
          onCancel && onCancel();
        }}
      ></div>
      {onConfirm && (
        <div className={styles.GameLayerBtns} style={{ bottom: 80 }}>
          <div
            className={styles.ConfirmIcon}
            aria-hidden="true"
            onClick={() => {
              onConfirm();
            }}
          ></div>
        </div>
      )}
    </div>
  );
}
