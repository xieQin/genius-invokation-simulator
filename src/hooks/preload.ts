import { useState } from "react";

import { PUBLIC_PATH } from "@/configs";
import cards from "@/data/cards.json";
import characters from "@/data/characters.json";
import skills from "@/data/skill-imgs.json";

export const usePreload = () => {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(0);
  const [err, setErr] = useState(0);

  // if (PUBLIC_PATH === "") {
  //   return {
  //     loading: false,
  //     loaded: 0,
  //     total: 0,
  //     err: 0,
  //   };
  // }

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
      image.onerror = reject;
      image.src = src;
    });

  const preloadAll = async () => {
    const promises = imgs.map(img =>
      preload(img)
        .then(() => {
          setLoaded(loaded + 1 + err < total ? loaded + 1 : total);
        })
        .catch(err => {
          setErr(err + 1);
        })
    );
    for (const promise of promises) {
      await promise;
    }
    if (loaded + err >= total) {
      setLoading(false);
    }
  };
  preloadAll();

  return { loading, total, err, loaded };
};
