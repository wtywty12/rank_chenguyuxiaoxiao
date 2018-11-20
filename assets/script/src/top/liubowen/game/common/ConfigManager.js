"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringUtils_1 = require("../../core/utils/StringUtils");
var ConfigManagerClass = (function () {
    function ConfigManagerClass() {
    }
    Object.defineProperty(ConfigManagerClass, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new ConfigManagerClass();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    ConfigManagerClass.prototype.load = function () {
        return new Promise(function (fulfill, reject) {
            cc.loader.loadResDir("jsons", function (error, datas, urls) {
                if (error) {
                    cc.error(error);
                    return;
                }
                for (var i = 0; i < datas.length; i++) {
                    var name_1 = StringUtils_1.StringUtils.getName(urls[i]);
                    var data = datas[i];
                }
                return fulfill();
            });
        });
    };
    return ConfigManagerClass;
}());
exports.ConfigManager = ConfigManagerClass.instance;
