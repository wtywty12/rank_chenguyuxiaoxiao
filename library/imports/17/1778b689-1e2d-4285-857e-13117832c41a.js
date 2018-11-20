"use strict";
cc._RF.push(module, '1778baJHi1ChYV+ExF4MsQa', 'GameScene');
// script/src/top/liubowen/core/component/GameScene.js

"use strict";

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var GameEventListeners_1 = require("../event/GameEventListeners");
var GameEventTransmitter_1 = require("../event/GameEventTransmitter");
var GameScene = function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        return _super.call(this) || this;
    }
    GameScene.prototype.onLoad = function () {
        this.listeners = new GameEventListeners_1.GameEventListeners(this.uuid);
        GameEventTransmitter_1.GameEventTransmitter.on(this.listeners);
        this.load();
    };
    GameScene.prototype.onDestroy = function () {
        this.unload();
        GameEventTransmitter_1.GameEventTransmitter.off(this.listeners.name);
        this.listeners.clear();
    };
    GameScene.prototype.addListener = function (listener) {
        this.listeners.on(listener);
    };
    GameScene.prototype.removeListener = function (eventCode) {
        this.listeners.off(eventCode);
    };
    return GameScene;
}(cc.Component);
exports.GameScene = GameScene;

cc._RF.pop();