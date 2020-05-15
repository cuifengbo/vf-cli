"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("./store");
const Component_1 = require("../types/Component");
const dinoWidth = 83;
const dino = {
    type: Component_1.guiType.IMAGE,
    y: 140,
    width: dinoWidth,
    height: 138,
    src: store_1.Ids.dinoImage,
    x: store_1.App.width / 2 - dinoWidth / 2,
};
const title = {
    type: Component_1.guiType.TEXT,
    width: 100,
    style: {
        color: '#000'
    }
};
const evaname = {
    type: Component_1.guiType.EVALUATER,
    userId: "9527",
    appId: "a154d34f8e7e41159c175a85bf2a24ba",
    sdkType: "h5",
    debug: false,
    env: "test",
    rank: 100,
    evalMode: 1,
    textMode: 0,
    receiveTimeout: 10000,
    refText: "Nice to meet you!",
    recorderMaxTime: 14000,
    autoStopMaxRecord: true,
};
const auu = {
    type: Component_1.guiType.AUDIO,
    src: store_1.Ids.dinoSay,
};
const root = {
    type: Component_1.guiType.CUSTOM,
    children: [
        {
            id: store_1.Ids.dinoImage,
            libId: store_1.Ids.dinoImage
        },
        {
            id: store_1.Ids.title,
            libId: store_1.Ids.title,
            text: 'Hello no!',
            y: dino.y + 158,
            x: store_1.App.width / 2 - title.width / 2
        }, {
            id: store_1.Ids.dinoSay,
            libId: store_1.Ids.dinoSay
        }
    ],
    actionList: `
        @this = {

            this.1.on("click", () => {
                trace("trigger dino");
                trace(this#4.isPlaying);
                if(this#4.isPlaying){
                    this#4.pause();
                }else{
                    this#4.play();
                }

                this#4.on("ended",()=>{
                    trace(this#4.src);
                    trace(this#4.autoplay);
                    trace(this#4.loop);
                    trace(this#4.playbackRate);
                    trace(this#4.volume);
                    trace(this#4.duration);
                   
                });

            });
            this.1.on("Added",() => {
                trace("loaded");
                this#4.on("canplaythrough",()=>{trace("加载完成可以播放了")});
                this#4.on("play",()=>{trace("小喇叭开始广播啦")});
                this#4.on("pause",()=>{trace("暂停营业")});
                this#4.on("error",()=>{trace("出错了")});
                this#4.on("timeupdate",()=>{trace("playing...")});
                this#4.on("ended",()=>{trace("播放完成")});
            });
            
        }
        
           
       
       
    `
};
const allComponents = {
    [store_1.Ids.root]: root,
    [store_1.Ids.title]: title,
    [store_1.Ids.dinoImage]: dino,
    [store_1.Ids.eva]: evaname,
    [store_1.Ids.dinoSay]: auu
};
exports.default = allComponents;
