"use strict";
cc._RF.push(module, 'b9f2adLatdO3LSNYU3fecLY', 'GameDataManager');
// script/src/top/liubowen/game/common/data/GameDataManager.js

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameDataManagerClass = function () {
    function GameDataManagerClass() {}
    Object.defineProperty(GameDataManagerClass, "instance", {
        get: function get() {
            if (this._instance == null) {
                this._instance = new GameDataManagerClass();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    GameDataManagerClass.prototype.dataChange = function (responseData) {};
    return GameDataManagerClass;
}();
exports.GameDataManager = GameDataManagerClass.instance;

cc._RF.pop();