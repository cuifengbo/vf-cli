/*
*   全部文档: https://code.vipkid.com.cn/xyz/docs
*   动画文档: https://code.vipkid.com.cn/xyz/docs/blob/master/docs/handbook/animation.md
*   VFX 使用文档: https://code.vipkid.com.cn/xyz/docs/blob/master/docs/handbook/aciton.md
* */

import {App, Ids} from "./store";
import {gui, guiType} from "../types/Component";
import {Components} from "../types/IVFTemplate";

const dinoWidth = 83
const dino: gui.Image = {
    type: guiType.IMAGE,
    y: 140,
    width: dinoWidth,
    height: 138,
    src: Ids.dinoImage,
    x: App.width / 2 -  dinoWidth / 2,
};

const title: gui.Text = {
    type: guiType.TEXT,
    width: 100,
    style: {
        color: '#000'
    }
}
const evaname:gui.Evaluater = {
    type: guiType.EVALUATER,
    userId: "9527",
    appId : "a154d34f8e7e41159c175a85bf2a24ba",
    sdkType : "h5",
    debug : false,
    env : "test",

    rank : 100, //分值
    evalMode : 1, //句子
    textMode : 0, //普通文本
    receiveTimeout : 10000,//返回结果超时
    refText : "Nice to meet you!", //文本
    recorderMaxTime : 14000,
    autoStopMaxRecord : true,
}
const auu: gui.Audio = {
    type: guiType.AUDIO,
    src: Ids.dinoSay,
   
}
const root: gui.Custom = {
    type: guiType.CUSTOM,
    children: [
        {
            id: Ids.dinoImage,
            libId: Ids.dinoImage
        },
        {
            id: Ids.title,
            libId: Ids.title,
            text: 'Hello no!',
            y: dino.y! + 158,
            x: App.width / 2 - title.width! / 2
        },{
            id:Ids.dinoSay,
            libId : Ids.dinoSay

        }
    ],
    // 用 VFX 编写的可执行逻辑，文档请见 https://code.vipkid.com.cn/xyz/docs/blob/master/docs/handbook/aciton.md
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

const allComponents: Components = {
    [Ids.root]: root,
    [Ids.title]: title,
    [Ids.dinoImage]: dino,
    [Ids.eva]:evaname,
    [Ids.dinoSay]:auu
}

export default allComponents
