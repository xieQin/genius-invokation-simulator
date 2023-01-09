import { useState } from "react";

import { PUBLIC_PATH } from "@/configs";
import cards from "@/data/cards.json";
import characters from "@/data/characters.json";

export const usePreload = () => {
  const [loading, setLoading] = useState(true);

  const cardImgs = cards.map(card => `${PUBLIC_PATH}/cards/${card.imgID}.png`);
  const characterImgs = characters.map(
    character => `${PUBLIC_PATH}/characters/${character.imgID}.png`
  );
  // const cardImgs = cards.map(card => card.img);
  // const characterImgs = characters.map(character => character.img);
  const imgs = cardImgs.concat(characterImgs);
  const preload = (src: string) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = resolve;
      image.onerror = reject;
      image.src = src;
    });

  const preloadAll = async () => {
    await Promise.all(imgs.map(img => preload(img)));
    setLoading(false);
    console.log("all loaded", new Date());
  };
  console.log("start load", new Date());
  preloadAll();

  return { loading };
};
