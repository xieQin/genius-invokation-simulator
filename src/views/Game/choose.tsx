import { useState } from "react";

import ChooseZone, { SetActiveCharacterHint } from "@/components/ChooseZone";
import Notice from "@/components/Notice";
import { useChoosePhase } from "@/hooks/phase";

export default function ChoosePhase() {
  const { onChoosePhaseEnd, isEndValid } = useChoosePhase();
  const [message, setMessage] = useState("Choose your first character");

  // showMessage(message);
  return (
    <>
      <Notice message={message} timeout={800} callback={() => setMessage("")} />
      <ChooseZone
        element={<SetActiveCharacterHint />}
        onClick={isEndValid() ? onChoosePhaseEnd : () => ({})}
      />
    </>
  );
}
