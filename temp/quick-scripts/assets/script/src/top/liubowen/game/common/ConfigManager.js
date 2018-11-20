(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/src/top/liubowen/game/common/ConfigManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2c388b+qlNFD6CPqDbu7O/R', 'ConfigManager', __filename);
// script/src/top/liubowen/game/common/ConfigManager.js

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StringUtils_1 = require("../../core/utils/StringUtils");
var ConfigManagerClass = function () {
    function ConfigManagerClass() {}
    Object.defineProperty(ConfigManagerClass, "instance", {
        get: function get() {
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
}();
exports.ConfigManager = ConfigManagerClass.instance;

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
        //# sourceMappingURL=ConfigManager.js.map
        