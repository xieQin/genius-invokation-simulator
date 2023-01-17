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
import RollPhase from "./roll";

export default function Game() {
  const store = useGameStore();
  const { message, msgCallback, phase } = store;
  const { onPreviewEnd } = usePreview();
  return (
    <div
      aria-hidden="true"
      onClick={() => {
        onPreviewEnd();
      }}
    >
      <PreviewZone />
      <InitPhase />
      <ChoosePhase />
      <RollPhase />
      {phase === Phase.PlayCard && <PlayCardPhase />}
      {phase === Phase.DraftCard && <DraftCardPhase />}
      {phase === Phase.ChangeCharacter && <ChangeCharacterPhase />}
      <Deck />
      {message && <Notice message={message} callback={msgCallback} />}
      <SettingZone />
    </div>
  );
}
