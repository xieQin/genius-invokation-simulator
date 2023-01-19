import { useEffect, useState } from "react";

export const useAutoScale = () => {
  const defaultWidth = 1920;
  const defaultHeight = 1080;
  const getScale = (): number => {
    const documentWidth = document.documentElement.clientWidth;
    const documentHeight = document.documentElement.clientHeight;
    return documentWidth / documentHeight < defaultWidth / defaultHeight
      ? documentWidth / defaultWidth
      : documentHeight / defaultHeight;
  };
  const [isLandscape, setIsLandscape] = useState(false);
  const [scale, setScale] = useState(getScale());
  const handleResize = () => {
    setIsLandscape(window.innerWidth > window.innerHeight * 0.9);
  };
  const autoScale = () => {
    window.addEventListener("resize", handleResize);
    handleResize();
    if (isLandscape) {
      setScale(getScale());
      (
        document.querySelector("#screen") as HTMLElement
      ).style.transform = `scale(${scale}) translate(-50%)`;
    }
  };

  useEffect((): (() => void) => {
    autoScale();
    window.onresize = () => autoScale();
    return () => (window.onresize = null);
  });

  return {
    scale,
    isLandscape,
  };
};
