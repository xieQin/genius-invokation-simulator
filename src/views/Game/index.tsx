import { useEffect, useRef, useState } from "react";

import Deck from "@/components/Deck";
import Notice from "@/components/Notice";
import PreviewZone from "@/components/PreviewZone";
import SettingZone from "@/components/SettingZone";
import { usePreview } from "@/hooks";
import { Phase } from "@/models/phase";
import { useGameStore } from "@/stores";

import ChangeCharacterPhase from "./change";
import ChoosePhase from "./choose";
import DraftCardPhase from "./draft";
import InitPhase from "./init";
import PlayCardPhase from "./play";
import PrepareGame from "./prepare";
import RollPhase from "./roll";

export default function Game() {
  const store = useGameStore();
  const { message, msgCallback, phase } = store;
  const { onPreviewEnd } = usePreview();
  const [isPrepared, setIsPrepared] = useState(false);
  const timer: { current: number | null } = useRef(null);

  useEffect(() => {
    timer.current = window.setTimeout(() => {
      setIsPrepared(true);
    }, 2500);
    return () => {
      clearTimeout(timer.current as number);
    };
  });
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
          {phase === Phase.PlayCard && <PlayCardPhase />}
          {phase === Phase.DraftCard && <DraftCardPhase />}
          {phase === Phase.ChangeCharacter && <ChangeCharacterPhase />}
          {message && <Notice message={message} callback={msgCallback} />}
          <SettingZone />
        </>
      )}
    </div>
  );
}
