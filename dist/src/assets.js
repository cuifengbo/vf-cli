"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("./store");
const IVFTemplate_1 = require("../types/IVFTemplate");
const assets = {
    [store_1.Ids.dinoImage]: {
        type: IVFTemplate_1.AssetType.IMAGE,
        url: './assets/dino.png',
        name: store_1.Ids.dinoImage.toString()
    },
    EVA: {
        type: IVFTemplate_1.AssetType.JS,
        url: "./assets/Evaluater.js",
        name: "Evaluater"
    },
    [store_1.Ids.dinoSay]: {
        type: IVFTemplate_1.AssetType.AUDIO,
        url: "https://s.vipkidstatic.com/fe-static/learning-stages/assets/great-20191221.mp3",
        name: store_1.Ids.dinoSay.toString()
    }
};
exports.default = assets;
