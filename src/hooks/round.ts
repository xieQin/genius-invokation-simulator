import { Action, Phase, PlayerPosition } from "@/models";
import { useGameStore } from "@/stores";

export const useRound = () => {
  const { showMessage, phase, round, current, setGameStates } = useGameStore();

  const onRoundEnd = () => {
    if (phase !== Phase.Combat) return;
    showMessage("Round end", () => {
      showMessage("");
      setGameStates("round", round + 1);
      setGameStates("phase", Phase.DraftCard);
      setGameStates("actions", [Action.None, Action.None]);
      setGameStates("current", PlayerPosition.Own);
    });
  };

  const onTurnEnd = () => {
    showMessage("Turn end", () => {
      showMessage("");
      setGameStates("current", Math.abs(current - 1));
    });
  };

  return {
    onRoundEnd,
    onTurnEnd,
  };
};
