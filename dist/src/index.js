"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("./store");
const scene_1 = require("./scene");
const assets_1 = require("./assets");
const global_1 = require("./global");
const components_1 = require("./components");
const IVFTemplate_1 = require("../types/IVFTemplate");
const Main = {
    assets: assets_1.default,
    global: global_1.default,
    scenes: scene_1.default,
    components: components_1.default,
    name: store_1.App.name,
    width: store_1.App.width,
    height: store_1.App.height,
    version: store_1.App.version,
    baseUrl: store_1.App.baseUrl,
    loadMode: IVFTemplate_1.LoadMode.ALL,
    conversion: store_1.App.conversion,
    scaleMode: IVFTemplate_1.ScaleMode.SHOW_ALL,
};
exports.default = Main;
