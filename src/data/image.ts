import { writeFileSync } from "fs";

import cards from "./cards.json";
import characters from "./characters.json";

const downloadImg = () => {
  const cardImgs = cards.map(card => ({
    id: card.imgID,
    img: card.img,
  }));
  const characterImgs = characters.map(character => ({
    id: character.imgID,
    img: character.img,
  }));
  const skillImgs = characters.map(character => {
    return character.skills.map(skill => ({
      id: skill.imgID,
      img: skill.img,
    }));
  });
  writeFileSync("./src/data/card-imgs.json", JSON.stringify(cardImgs));
  writeFileSync(
    "./src/data/character-imgs.json",
    JSON.stringify(characterImgs)
  );
  writeFileSync(
    "./src/data/skill-imgs.json",
    JSON.stringify(skillImgs.flat().sort())
  );

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
