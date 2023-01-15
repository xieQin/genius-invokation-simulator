import { PreviewStatus } from "@/models";
import { useGameStore } from "@/stores";

export const usePreview = () => {
  const { setGameStates } = useGameStore();
  const onPreview = (preview: unknown) => {
    localStorage.setItem("preview", PreviewStatus.Show);
    setGameStates("preview", preview);
  };
  const onPreviewEnd = () => {
    if (localStorage.getItem("preview") !== PreviewStatus.Show) {
      setGameStates("preview", null);
      localStorage.setItem("preview", PreviewStatus.Hide);
    }
  };
  return {
    onPreview,
    onPreviewEnd,
  };
};
