import styles from "./App.module.css";
import { useAutoScale } from "./hooks";
import Game from "./views/Game";

export default function App() {
  const { isLandscape } = useAutoScale();

  return (
    <div className={styles.screen}>
      {/* {loading && (
        <Loading
          text={`loading assets ${loaded} / ${total} ${
            err > 0 ? ", " + err + " errors" : ""
          } `}
        />
      )} */}
      {!isLandscape ? (
        <div className={styles.AlertText}>
          Please rotate your screen to landscape mode <br />
        </div>
      ) : (
        <main className={styles.main} id="screen">
          <Game />
          {/* {!loading && ( */}
          {/* <Notice message={<div>{message}</div>} /> */}
          {/* <Deck own={own} opposite={opposite} /> */}
        </main>
      )}
    </div>
  );
}
