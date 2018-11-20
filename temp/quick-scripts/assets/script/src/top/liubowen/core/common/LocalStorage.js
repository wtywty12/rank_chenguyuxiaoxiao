(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/src/top/liubowen/core/common/LocalStorage.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '69ffekX1GRAG7E10PKueVvs', 'LocalStorage', __filename);
// script/src/top/liubowen/core/common/LocalStorage.js

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LocalStorage = function () {
    function LocalStorage() {}
    LocalStorage.prototype.get = function (key) {
        return cc.sys.localStorage.getItem(key);
    };
    LocalStorage.prototype.set = function (key, value) {
        cc.sys.localStorage.setItem(key, value);
    };
    LocalStorage.prototype.remove = function (key) {
        cc.sys.localStorage.removeItem(key);
    };
    return LocalStorage;
}();
exports.LocalStorage = LocalStorage;

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
        //# sourceMappingURL=LocalStorage.js.map
        