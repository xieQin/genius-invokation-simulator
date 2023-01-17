import ChooseZone, { SetActiveCharacterHint } from "@/components/ChooseZone";
import Notice from "@/components/Notice";
import { useChoosePhase } from "@/hooks/phase";

export default function ChoosePhase() {
  const { endChoosePhase, isEndValid } = useChoosePhase();

  const message = "Choose your first character";

  return (
    <>
      <Notice message={message} timeout={800} />
      <ChooseZone
        element={<SetActiveCharacterHint />}
        onClick={isEndValid() ? endChoosePhase : () => ({})}
      />
    </>
  );
}
