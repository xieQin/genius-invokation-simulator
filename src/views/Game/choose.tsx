import { useState } from "react";

import ChooseZone, { SetActiveCharacterHint } from "@/components/ChooseZone";
import Notice from "@/components/Notice";
import { useChoosePhase } from "@/hooks";
import { PlayerPosition } from "@/models";

export default function ChoosePhase() {
  const pos = PlayerPosition.Own;
  const { onChoosePhaseEnd, isEndValid, isSelected, setActiveCharacter } =
    useChoosePhase(pos);
  const [message, setMessage] = useState("Choose your first character");

  return (
    <>
      <Notice message={message} timeout={800} callback={() => setMessage("")} />
      <ChooseZone
        element={<SetActiveCharacterHint />}
        onClick={
          isEndValid()
            ? onChoosePhaseEnd
            : isSelected()
            ? () => {
                setActiveCharacter();
                onChoosePhaseEnd();
              }
            : () => {
                console.log("err");
              }
        }
      />
    </>
  );
}
