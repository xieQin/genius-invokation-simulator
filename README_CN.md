# 七圣召唤模拟器

[![react](https://img.shields.io/github/package-json/dependency-version/xieQin/genius-invokation-simulator/react)](https://github.com/facebook/react) [![zustand](https://img.shields.io/github/package-json/dependency-version/xieQin/genius-invokation-simulator/zustand)](https://github.com/pmndrs/zustand) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/xieQin/genius-invokation-simulator/blob/main/LICENSE.md)

原神卡牌游戏七圣召唤的非官方模拟器。
All materials used here belong to miHoYo/HoYoverse/COGNOSPHERE and their respective owners.

![gi-simulator-snapshot.png](https://i.postimg.cc/N0Fnn9Fh/gi-simulator-snapshot.png)

## ENV

local env: add .env file

```
VITE_PUBLIC_PATH = ""
```

production env: add .env.production file

```
VITE_PUBLIC_PATH = {YOUR_PUBLIC_PATH}
```

## Usage

```bash
yarn
```

```bash
npm run dev
```

```bash
npm run build
```

## 路线图

- [x] 游戏区域
- [x] 游戏准备
  - [x] 抽取 5 张手牌
  - [x] 设置出战角色
- [x] 回合流程
  - [x] 投掷阶段
  - [x] 行动阶段
  - [ ] 结束阶段
- [ ] 元素反应
  - [x] 规则
  - [ ] 效果
- [ ] 其他规则

## License

This project is licensed under the MIT License.
