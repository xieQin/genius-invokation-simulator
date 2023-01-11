import styles from "./App.module.css";
import { useAutoScale } from "./hooks";
import Game from "./views/Game";

export default function App() {
  useAutoScale();
  // const { message } = useNotice();
  // const { loading, err, total, loaded } = usePreload();

  return (
    <>
      {/* {loading && (
        <Loading
          text={`loading assets ${loaded} / ${total} ${
            err > 0 ? ", " + err + " errors" : ""
          } `}
        />
      )} */}
      <main className={styles.main} id="screen">
        {/* {!loading && ( */}
        <>
          <Game />
          {/* <Notice message={<div>{message}</div>} /> */}
          {/* <Deck own={own} opposite={opposite} /> */}
        </>
        {/* )} */}
      </main>
    </>
  );
}
