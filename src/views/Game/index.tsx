import Deck from "@/components/Deck";
import Notice from "@/components/Notice";
import SettingZone from "@/components/SettingZone";
import { Phase } from "@/models/phase";

import ChoosePhase from "./choose";
import DraftCardPhase from "./draft";
import InitPhase from "./init";
import PlayCardPhase from "./play";
import RollPhase from "./roll";
import { useGameStore } from "./store";

export default function Game() {
  const store = useGameStore();
  const { toggleDeckStatus, message, msgCallback, own, phase } = store;
  console.log(own);

  return (
    <>
      <InitPhase />
      <ChoosePhase />
      <RollPhase />
      <PlayCardPhase />
      {phase === Phase.DraftCard && <DraftCardPhase />}
      <Deck />
      {message && <Notice message={message} callback={msgCallback} />}
      <SettingZone toggle={toggleDeckStatus} />
    </>
  );
}
