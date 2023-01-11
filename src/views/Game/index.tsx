import styles from "@/assets/styles/game.module.css";
import Deck from "@/components/Deck";
import { DraftHandCardZone } from "@/components/HandCardZone";
import Notice from "@/components/Notice";
import SettingZone from "@/components/SettingZone";
import { PUBLIC_PATH } from "@/configs";
import { PlayerPosition } from "@/models";
import { GIDiceID } from "@/models/die";
import { Phase } from "@/models/phase";

import InitPhase from "./init";
import RollPhase from "./roll";
import { DeckStatus, useGameStore } from "./store";

export default function Game() {
  const store = useGameStore();
  const {
    phase,
    setPhase,
    setDices,
    own,
    opposite,
    deckStatus,
    toggleDeckStatus,
    message,
    showMessage,
  } = store;
  const onConfirm = () => {
    if (phase === Phase.Start) setPhase(Phase.Choose);
    toggleDeckStatus();
  };
  const onConfirmDice = (dices: GIDiceID[]) => {
    if (phase === Phase.Roll) setPhase(Phase.Combat);
    toggleDeckStatus();
    setDices(dices);
  };

  const onChooseCharacter = () => {
    if (phase === Phase.Choose) setPhase(Phase.Roll);
    showMessage("Roll Phase");
  };
  const messageCb = () => {
    showMessage("");
    toggleDeckStatus();
    setPhase(Phase.Roll);
  };
  return (
    <>
      {phase === Phase.Init && <InitPhase />}
      <SettingZone toggle={toggleDeckStatus} />
      <Deck />
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
      {deckStatus === DeckStatus.Hide && phase === Phase.Start && (
        <div className={styles.GameLayer}>
          <div className={styles.GameModalLayerText}>
            <p>Starting Hands</p>
            <p>select card(s) to switch</p>
          </div>
          <div className={styles.GameModalLayer}></div>
          <DraftHandCardZone
            cards={own.cards}
            player={PlayerPosition.Own}
            toggle={toggleDeckStatus}
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
      <RollPhase onConfirm={onConfirmDice} />
    </>
  );
}
