import { createWriteStream, writeFileSync } from "fs";
import { request } from "https";

import cards from "./cards.json";
import characters from "./character.json";

const downloadImg = () => {
  const cardImgs = cards.map(card => ({
    id: card.imgID,
    img: card.img,
  }));
  const characterImgs = characters.map(character => ({
    id: character.imgID,
    img: character.img,
  }));
  // writeFileSync(
  //   "./src/data/img.json",
  //   JSON.stringify(cardImgs.concat(characterImgs))
  // );

  // const downloadImg = (item: { id: string; img: string }) => {
  //   console.log(item);
  //   request(item.img, res => {
  //     res
  //       .pipe(createWriteStream(`/public/characters/${item.id}.png`))
  //       .on("close", () => {
  //         console.log(item, "close");
  //       })
  //       .on("finish", () => {
  //         console.log(item, "finish");
  //       });
  //   });
  // };

  // downloadImg(characterImgs[0]);
};

downloadImg();
