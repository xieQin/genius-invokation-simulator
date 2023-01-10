import { useState } from "react";

import Deck from "@/components/Deck";
import { DraftHandCardZone } from "@/components/HandCardZone";
import SettingZone from "@/components/SettingZone";
import { useInitGame } from "@/hooks/game";
import { PlayerPosition } from "@/models";

import styles from "./index.module.css";

export default function Game() {
  const [status, setStatus] = useState("hide");
  const { own, opposite } = useInitGame("Lumin", "Ellin");
  const toggle = () => {
    setStatus(status === "hide" ? "" : "hide");
  };
  return (
    <>
      <SettingZone toggle={toggle} />
      <Deck own={own} opposite={opposite} status={status} />
      {status === "hide" && (
        <div className={styles.GameLayer}>
          <div className={styles.GameModalLayerText}>
            <p>Starting Hands</p>
            <p>select card(s) to switch</p>
          </div>
          <div className={styles.GameModalLayer}></div>
          <DraftHandCardZone
            cards={own.cards}
            player={PlayerPosition.Own}
            toggle={toggle}
          />
          <DraftHandCardZone
            cards={opposite.cards}
            player={PlayerPosition.Opposite}
          />
        </div>
      )}
    </>
  );
}
