(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/src/top/liubowen/game/common/ComponentContext.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4dffcoqgklOhol7ASQKA2l5', 'ComponentContext', __filename);
// script/src/top/liubowen/game/common/ComponentContext.js

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ComponentContextClass = function () {
    function ComponentContextClass() {}
    Object.defineProperty(ComponentContextClass.prototype, "rankList", {
        get: function get() {
            return this._rankList;
        },
        set: function set(value) {
            this._rankList = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentContextClass, "instance", {
        get: function get() {
            if (this._instance == null) {
                this._instance = new ComponentContextClass();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    return ComponentContextClass;
}();
exports.ComponentContext = ComponentContextClass.instance;

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
        //# sourceMappingURL=ComponentContext.js.map
        