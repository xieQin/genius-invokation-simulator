import Deck from "@/components/Deck";
import Notice from "@/components/Notice";
import PreviewZone from "@/components/PreviewZone";
import SettingZone from "@/components/SettingZone";
import { PreviewStatus } from "@/models";
import { Phase } from "@/models/phase";
import { useGameStore } from "@/stores";

import ChoosePhase from "./choose";
import DraftCardPhase from "./draft";
import InitPhase from "./init";
import PlayCardPhase from "./play";
import RollPhase from "./roll";

export default function Game() {
  const store = useGameStore();
  const { setGameStates, message, msgCallback, phase } = store;

  return (
    <div
      aria-hidden="true"
      onClick={() => {
        if (localStorage.getItem("preview") !== PreviewStatus.Show) {
          setGameStates("preview", null);
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
      <SettingZone />
    </div>
  );
}
