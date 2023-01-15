import ChooseZone, { SetActiveCharacterHint } from "@/components/ChooseZone";
import { useChoosePhase } from "@/hooks/phase";
import { Phase } from "@/models/phase";
import { useGameStore } from "@/stores";

export default function ChoosePhase() {
  const { phase } = useGameStore();
  const { endChoosePhase, isEndValid } = useChoosePhase();

  if (phase !== Phase.Choose) {
    return <></>;
  }

  return (
    <ChooseZone
      element={<SetActiveCharacterHint />}
      onClick={isEndValid() ? endChoosePhase : () => ({})}
    />
  );
}
