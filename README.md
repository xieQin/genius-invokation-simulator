# Genius Invokation Simulator

[![react](https://img.shields.io/github/package-json/dependency-version/xieQin/genius-invokation-simulator/react)](https://github.com/facebook/react) [![zustand](https://img.shields.io/github/package-json/dependency-version/xieQin/genius-invokation-simulator/zustand)](https://github.com/pmndrs/zustand) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/xieQin/genius-invokation-simulator/blob/main/LICENSE.md)

An unofficial simulator for Genius Invokation TCG in Genshin Impact.
All materials used here belong to miHoYo/HoYoverse/COGNOSPHERE and their respective owners.

![gi-simulator-snapshot.png](https://i.postimg.cc/N0Fnn9Fh/gi-simulator-snapshot.png)

## ENV

local env: add .env file

```
VITE_PUBLIC_PATH = ""
VITE_RELOAD_SW = "true"
VITE_APP_BUILD_DATE = {replaced dyanmicaly}
```

production env: add .env.production file

```
VITE_PUBLIC_PATH = ""
VITE_RELOAD_SW = "true"
VITE_APP_BUILD_DATE = {replaced dyanmicaly}
```

## Usage

```bash
yarn
```

```bash
yarn dev
```

```bash
yarn build
```

## Roadmap

- [x] Game Area
- [x] Prepare to Duel
  - [x] Draw 5 hand cards
  - [x] Set active character
- [x] Round Flow
  - [x] Roll Phase
  - [x] Action Phase
  - [x] End Phase
- [ ] Elemental Reactions
  - [x] Rules
  - [ ] Effects
- [ ] Other Rules

## License

This project is licensed under the MIT License.
