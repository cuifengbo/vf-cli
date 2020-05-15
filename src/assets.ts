import {Ids} from "./store";
import {Assets, AssetType} from '../types/IVFTemplate'

const assets: Assets = {
    [Ids.dinoImage]: {
        type: AssetType.IMAGE,
        url: './assets/dino.png',
        name: Ids.dinoImage.toString()
    },
    EVA:{
        type: AssetType.JS,
        url: "./assets/Evaluater.js",
        name: "Evaluater"
    },
    [Ids.dinoSay]:{
        type: AssetType.AUDIO,
        url: "https://s.vipkidstatic.com/fe-static/learning-stages/assets/great-20191221.mp3",
        name:Ids.dinoSay.toString()
    }
}

export default assets
