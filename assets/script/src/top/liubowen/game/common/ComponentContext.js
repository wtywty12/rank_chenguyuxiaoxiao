"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentContextClass = (function () {
    function ComponentContextClass() {
    }
    Object.defineProperty(ComponentContextClass.prototype, "rankList", {
        get: function () {
            return this._rankList;
        },
        set: function (value) {
            this._rankList = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentContextClass, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new ComponentContextClass();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    return ComponentContextClass;
}());
exports.ComponentContext = ComponentContextClass.instance;
