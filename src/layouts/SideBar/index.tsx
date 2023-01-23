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
  if (pathname === "/game") return <></>;
  return (
    <div className={styles.SideBar}>
      <div className={styles.SideBarLayout}>
        <div className={[styles.SideBarItem, styles.Main].join(" ")}>
          <div className={styles.SideBarItemLabel}>Diona.World</div>
        </div>
        {SideBarConfigs.map(item => (
          <SideBarItem key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}
