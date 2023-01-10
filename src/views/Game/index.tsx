import { useState } from "react";

import styles from "@/assets/styles/game.module.css";
import Deck from "@/components/Deck";
import { DraftHandCardZone } from "@/components/HandCardZone";
import Notice from "@/components/Notice";
import SettingZone from "@/components/SettingZone";
import { PUBLIC_PATH } from "@/configs";
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

  const onChooseCharacter = () => {
    if (phase === Phase.Choose) setPhase(Phase.Roll);
    setMessage("Roll Phase");
  };
  const messageCb = () => {
    setMessage("");
    setStatus("hide");
    setPhase(Phase.Roll);
  };
  return (
    <>
      <SettingZone toggle={toggle} />
      <Deck own={own} opposite={opposite} status={status} dices={dices} />
      {message && <Notice message={message} cb={messageCb} />}
      {phase === Phase.Choose && (
        <div
          className={styles.SetActiveCharacter}
          aria-hidden="true"
          onClick={() => {
            onChooseCharacter();
          }}
        >
          <img src={`${PUBLIC_PATH}/images/choose-character-icon.png`} alt="" />
        </div>
      )}
      {status === "hide" && phase === Phase.Start && (
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
      {status === "hide" && phase === Phase.Roll && (
        <Roll onConfirm={onConfirmDice} />
      )}
    </>
  );
}
