import { useEffect, useState } from "react";

import styles from "./App.module.css";
import Deck from "./components/Deck";
import Notice from "./components/Notice";

export default function App() {
  const defaultWidth = 1920;
  const defaultHeight = 1080;
  const getScale = (): number => {
    const documentWidth = document.documentElement.clientWidth;
    const documentHeight = document.documentElement.clientHeight;
    return documentWidth / documentHeight < defaultWidth / defaultHeight
      ? documentWidth / defaultWidth
      : documentHeight / defaultHeight;
  };

  const [scale, setScale] = useState(getScale());

  const autoScale = () => {
    setScale(getScale());
    (
      document.querySelector("#screen") as HTMLElement
    ).style.transform = `scale(${scale}) translate(-50%)`;
  };

  useEffect((): any => {
    autoScale();
    window.onresize = () => autoScale();
    return () => (window.onresize = null);
  });

  const message = () => {
    return <div>Your Turn Now !</div>;
  };

  return (
    <main className={styles.main} id="screen">
      <Notice message={message()} />
      <Deck />
    </main>
  );
}
