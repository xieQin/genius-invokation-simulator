import CopyRight from "@/components/CopyRight";
import Language from "@/components/Language";

import Container from "./Container";
import styles from "./index.module.css";
import SideBar from "./SideBar";

export default function Layout() {
  return (
    <div className={styles.Layout}>
      <SideBar />
      <Container />
      <Language />
      <CopyRight />
    </div>
  );
}
