"use strict";
cc._RF.push(module, '4dffcoqgklOhol7ASQKA2l5', 'ComponentContext');
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