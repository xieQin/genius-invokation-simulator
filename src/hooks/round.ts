import { Action, Phase, PlayerPosition } from "@/models";
import { useGameStore } from "@/stores";

export const useRound = () => {
  const { showMessage, phase, round, setGameStates } = useGameStore();

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

  const onTurnEnd = (pos: PlayerPosition) => {
    showMessage("Turn end", () => {
      setGameStates("actions", [Action.None, Action.None]);
      showMessage("");
      setGameStates("current", pos);
    });
  };

  return {
    onRoundEnd,
    onTurnEnd,
  };
};
