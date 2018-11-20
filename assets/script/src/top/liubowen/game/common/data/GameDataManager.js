"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameDataManagerClass = (function () {
    function GameDataManagerClass() {
    }
    Object.defineProperty(GameDataManagerClass, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new GameDataManagerClass();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    GameDataManagerClass.prototype.dataChange = function (responseData) {
    };
    return GameDataManagerClass;
}());
exports.GameDataManager = GameDataManagerClass.instance;
