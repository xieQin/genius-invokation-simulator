import styles from "./App.module.css";
import Deck from "./components/Deck";

export default function App() {
  return (
    <main className={styles.main}>
      <Deck />
    </main>
  );
}
