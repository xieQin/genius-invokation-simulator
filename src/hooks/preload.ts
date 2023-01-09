import { useState } from "react";

import { PUBLIC_PATH } from "@/configs";
import cards from "@/data/cards.json";
import characters from "@/data/characters.json";
import skills from "@/data/skill-imgs.json";

export const usePreload = () => {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const cardImgs = cards.map(card => `${PUBLIC_PATH}/cards/${card.imgID}.png`);
  const characterImgs = characters.map(
    character => `${PUBLIC_PATH}/characters/${character.imgID}.png`
  );
  const skillImgs = skills.map(
    skill => `${PUBLIC_PATH}/skills/${skill.id}.png`
  );
  const imgs = [...cardImgs, ...characterImgs, ...skillImgs];
  const total = imgs.length;
  const preload = (src: string) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = resolve;
      image.onerror = () => reject();
      image.src = src;
    });

  const preloadAll = async () => {
    await Promise.all(
      imgs.map(img => preload(img).then(() => setCount(count + 1)))
    );
    setLoading(false);
    console.log("all loaded", new Date());
  };
  console.log("start load", new Date());
  preloadAll();

  return { total, count, loading };
};
