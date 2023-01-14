import Deck from "@/components/Deck";
import Notice from "@/components/Notice";
import PreviewZone from "@/components/PreviewZone";
import SettingZone from "@/components/SettingZone";
import { Phase } from "@/models/phase";

import ChoosePhase from "./choose";
import DraftCardPhase from "./draft";
import InitPhase from "./init";
import PlayCardPhase from "./play";
import RollPhase from "./roll";
import { PreviewStatus, useGameStore } from "./store";

export default function Game() {
  const store = useGameStore();
  const { toggleDeckStatus, message, msgCallback, phase, setPreview } = store;
  console.log(phase);

  return (
    <div
      aria-hidden="true"
      onClick={() => {
        if (localStorage.getItem("preview") !== PreviewStatus.Show) {
          setPreview(null);
          localStorage.setItem("preview", PreviewStatus.Hide);
        }
      }}
    >
      <PreviewZone />
      <InitPhase />
      <ChoosePhase />
      <RollPhase />
      {phase === Phase.PlayCard && <PlayCardPhase />}
      {phase === Phase.DraftCard && <DraftCardPhase />}
      <Deck />
      {message && <Notice message={message} callback={msgCallback} />}
      <SettingZone toggle={toggleDeckStatus} />
    </div>
  );
}
