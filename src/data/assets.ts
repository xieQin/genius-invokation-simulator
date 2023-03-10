import { lstatSync, readdirSync, writeFileSync } from "fs";

// import cards from "./cards.json";
// import characters from "./characters.json";

// const downloadImg = () => {
//   const cardImgs = cards.map(card => ({
//     id: card.imgID,
//     img: card.img,
//   }));
//   const characterImgs = characters.map(character => ({
//     id: character.imgID,
//     img: character.img,
//   }));
//   const skillImgs = characters.map(character => {
//     return character.skills.map(skill => ({
//       id: skill.imgID,
//       img: skill.img,
//     }));
//   });
//   const imgs = [...cardImgs, ...characterImgs, ...skillImgs]
//     .flat()
//     .map(i => i.img);
//   writeFileSync("./src/data/card-imgs.json", JSON.stringify(cardImgs));
//   writeFileSync(
//     "./src/data/character-imgs.json",
//     JSON.stringify(characterImgs)
//   );
//   writeFileSync(
//     "./src/data/skill-imgs.json",
//     JSON.stringify(skillImgs.flat().sort())
//   );
//   writeFileSync("./src/data/imgs.json", JSON.stringify(imgs.flat().sort()));

//   // const downloadImg = (item: { id: string; img: string }) => {
//   //   console.log(item);
//   //   request(item.img, res => {
//   //     res
//   //       .pipe(createWriteStream(`/public/characters/${item.id}.png`))
//   //       .on("close", () => {
//   //         console.log(item, "close");
//   //       })
//   //       .on("finish", () => {
//   //         console.log(item, "finish");
//   //       });
//   //   });
//   // };

//   // downloadImg(characterImgs[0]);
// };

// downloadImg();
const assets: string[] = [];
const files = readdirSync("./public");
files.forEach(item => {
  const fileName = "./public/" + item;
  const stat = lstatSync(fileName);
  if (stat.isDirectory() === true) {
    const _files = readdirSync(fileName);
    _files.forEach(f => {
      const _f = fileName + "/" + f;
      const _stat = lstatSync(_f);
      if (_stat.isDirectory() !== true && f !== ".DS_Store") {
        assets.push("/" + item + "/" + f);
      }
    });
  } else {
    item !== ".DS_Store" && assets.push("/" + item);
  }
});

writeFileSync("./src/configs/assets.json", JSON.stringify(assets));
