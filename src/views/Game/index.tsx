import { useState } from "react";

import styles from "@/assets/styles/game.module.css";
import Deck from "@/components/Deck";
import { DraftHandCardZone } from "@/components/HandCardZone";
import Notice from "@/components/Notice";
import SettingZone from "@/components/SettingZone";
import { useInitGame } from "@/hooks/game";
import { PlayerPosition } from "@/models";
import { GIDiceID } from "@/models/die";
import { Phase } from "@/models/phase";

import Roll from "../Roll";

export default function Game() {
  const [phase, setPhase] = useState(Phase.Start);
  const [status, setStatus] = useState("hide");
  const [message, setMessage] = useState("");
  const [dices, setDices] = useState([] as GIDiceID[]);
  const { own, opposite } = useInitGame("Lumin", "Ellin");
  // setMessage("Roll Phase");
  const toggle = () => {
    setStatus(status === "hide" ? "" : "hide");
  };
  const onConfirm = () => {
    if (phase === Phase.Start) setPhase(Phase.Choose);
    setStatus("");
  };
  const onConfirmDice = (dices: GIDiceID[]) => {
    if (phase === Phase.Roll) setPhase(Phase.Combat);
    setStatus("");
    setDices(dices);
  };
  return (
    <>
      <SettingZone toggle={toggle} />
      <Deck own={own} opposite={opposite} status={status} dices={dices} />
      {message && <Notice message={message} />}
      {status === "hide" && phase === "start" && (
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
          <div
            className={styles.GameLayerBtns}
            aria-hidden="true"
            onClick={() => {
              onConfirm();
            }}
          >
            <div className={styles.ConfirmIcon}></div>
          </div>
        </div>
      )}
      {status === "hide" && phase === "roll" && (
        <Roll onConfirm={onConfirmDice} />
      )}
    </>
  );
}
