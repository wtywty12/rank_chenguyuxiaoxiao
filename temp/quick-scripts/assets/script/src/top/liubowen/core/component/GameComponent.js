(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/src/top/liubowen/core/component/GameComponent.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8f7feC2jURLeYIMVm2roGWe', 'GameComponent', __filename);
// script/src/top/liubowen/core/component/GameComponent.js

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
var GameComponent = function (_super) {
    __extends(GameComponent, _super);
    function GameComponent() {
        return _super.call(this) || this;
    }
    GameComponent.prototype.onLoad = function () {
        this.listeners = new GameEventListeners_1.GameEventListeners(this.uuid);
        GameEventTransmitter_1.GameEventTransmitter.on(this.listeners);
        this.load();
    };
    GameComponent.prototype.onDestroy = function () {
        this.unload();
        GameEventTransmitter_1.GameEventTransmitter.off(this.listeners.name);
        this.listeners.clear();
    };
    GameComponent.prototype.addListener = function (listener) {
        this.listeners.on(listener);
    };
    GameComponent.prototype.removeListener = function (eventCode) {
        this.listeners.off(eventCode);
    };
    return GameComponent;
}(cc.Component);
exports.GameComponent = GameComponent;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GameComponent.js.map
        