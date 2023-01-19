import styles from "./home.module.css";

export default function HomePage() {
  return (
    <>
      <div className={styles.Container}>
        <div className={[styles.Card, styles.Collei].join(" ")}></div>
        <div className={[styles.Card, styles.Cyno].join(" ")}></div>
        <div className={[styles.Card, styles.Fischl].join(" ")}></div>
      </div>
      <div className={[styles.Container].join(" ")}>
        <div
          className={[styles.Card, styles.Barbara, styles.Animate2].join(" ")}
        ></div>
        <div
          className={[styles.Card, styles.Barbara, styles.Animate].join(" ")}
        ></div>
        <div
          className={[styles.Card, styles.Barbara, styles.Animate].join(" ")}
        ></div>
      </div>
    </>
  );
}
