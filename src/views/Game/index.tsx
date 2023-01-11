import Deck from "@/components/Deck";
import Notice from "@/components/Notice";
import SettingZone from "@/components/SettingZone";

import ChoosePhase from "./choose";
import InitPhase from "./init";
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
      <Deck />
      {message && <Notice message={message} callback={msgCallback} />}
      <SettingZone toggle={toggleDeckStatus} />
    </>
  );
}
