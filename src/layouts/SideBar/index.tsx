import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import styles from "./index.module.css";

export interface SideBarProps {
  label: string;
  to: string;
}

export const SideBarConfigs: SideBarProps[] = [
  {
    label: "Home",
    to: "/home",
  },
  {
    label: "Deck",
    to: "/deck",
  },
  {
    label: "Game",
    to: "/game",
  },
  {
    label: "Settings",
    to: "/settings",
  },
];

export const SideBarItem = (item: SideBarProps) => {
  const { pathname } = useLocation();
  return (
    <NavLink to={item.to}>
      <div
        className={[
          styles.SideBarItem,
          pathname === item.to ? styles.Active : "",
        ].join(" ")}
      >
        <div
          className={[styles.SideBarItemIcon, styles[item.label]].join(" ")}
        ></div>
        <div className={styles.SideBarItemLabel}>{item.label}</div>
      </div>
    </NavLink>
  );
};

export default function SideBar() {
  const { pathname } = useLocation();
  const [active, setActive] = useState(
    document.documentElement.clientWidth >= 1024 ? true : false
  );
  useEffect((): (() => void) => {
    window.onresize = () =>
      setActive(document.documentElement.clientWidth >= 1024 ? true : false);
    return () => (window.onresize = null);
  });
  useEffect(() => {
    document.documentElement.clientWidth < 1024 && setActive(!active);
  }, [pathname]);
  if (pathname === "/game") return <></>;
  return (
    <>
      <div className={styles.TopBar}>
        <div className={styles.TopBarLabel}>Diona.World</div>
        <div
          aria-hidden="true"
          className={styles.TopBarBtns}
          onClick={() => setActive(!active)}
        >
          +
        </div>
      </div>
      <div
        className={styles.SideBar}
        style={{ display: active ? "block" : "none" }}
      >
        <div className={styles.SideBarLayout}>
          <div className={[styles.SideBarItem, styles.Main].join(" ")}>
            <div className={styles.SideBarItemLabel}>Diona.World</div>
          </div>
          {SideBarConfigs.map(item => (
            <SideBarItem key={item.label} {...item} />
          ))}
        </div>
      </div>
    </>
  );
}
