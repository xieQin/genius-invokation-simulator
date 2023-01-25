import { useState } from "react";

import styles from "@/assets/styles/area.module.css";
import Deck from "@/components/Deck";
import Notice from "@/components/Notice";
import PreviewZone from "@/components/PreviewZone";
import SettingZone from "@/components/SettingZone";
import { useAutoScale, usePreview, useTimeout } from "@/hooks";
import { Phase } from "@/models/phase";
import { useGameStore } from "@/stores";
import isMobile from "@/utils/is-mobile";

import ChangeCharacterPhase from "./change";
import ChoosePhase from "./choose";
import DraftCardPhase from "./draft";
import InitPhase from "./init";
import PlayCardPhase from "./play";
import PrepareGame from "./prepare";
import RollPhase from "./roll";
import SkillPhase from "./skill";

export default function GamePage() {
  const { isLandscape } = useAutoScale();

  return (
    <div className={styles.screen}>
      {/* {loading && (
        <Loading
          text={`loading assets ${loaded} / ${total} ${
            err > 0 ? ", " + err + " errors" : ""
          } `}
        />
      )} */}
      {!isLandscape && isMobile ? (
        <div className={styles.AlertText}>
          Please rotate your screen to landscape mode <br />
        </div>
      ) : (
        <main className={styles.main} id="screen">
          <Game />
          {/* {!loading && ( */}
          {/* <Notice message={<div>{message}</div>} /> */}
          {/* <Deck own={own} opponent={opponent} /> */}
        </main>
      )}
    </div>
  );
}

export const Game = () => {
  const store = useGameStore();
  const { message, msgCallback, phase } = store;
  const { onPreviewEnd } = usePreview();
  const [isPrepared, setIsPrepared] = useState(false);

  useTimeout(() => {
    setIsPrepared(true);
  }, 3500);

  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        height: "100%",
      }}
      onClick={() => {
        onPreviewEnd();
      }}
    >
      {!isPrepared ? (
        <PrepareGame />
      ) : (
        <>
          <Deck />
          <PreviewZone />
          <InitPhase />
          {phase === Phase.Choose && <ChoosePhase />}
          <RollPhase />
          {phase === Phase.Skill && <SkillPhase />}
          {phase === Phase.PlayCard && <PlayCardPhase />}
          {phase === Phase.DraftCard && <DraftCardPhase />}
          {phase === Phase.ChangeCharacter && <ChangeCharacterPhase />}
          {message && <Notice message={message} callback={msgCallback} />}
          <SettingZone />
        </>
      )}
    </div>
  );
};
