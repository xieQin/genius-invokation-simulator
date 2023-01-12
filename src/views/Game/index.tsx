import Deck from "@/components/Deck";
import Notice from "@/components/Notice";
import SettingZone from "@/components/SettingZone";

import ChoosePhase from "./choose";
import DraftCardPhase from "./draft";
import InitPhase from "./init";
import PlayCardPhase from "./play";
import RollPhase from "./roll";
import { useGameStore } from "./store";

export default function Game() {
  const store = useGameStore();
  const { toggleDeckStatus, message, msgCallback } = store;

  return (
    <>
      <InitPhase />
      <ChoosePhase />
      <RollPhase />
      <PlayCardPhase />
      <DraftCardPhase />
      <Deck />
      {message && <Notice message={message} callback={msgCallback} />}
      <SettingZone toggle={toggleDeckStatus} />
    </>
  );
}
