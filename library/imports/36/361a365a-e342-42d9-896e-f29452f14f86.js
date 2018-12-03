"use strict";
cc._RF.push(module, '361a3Za40JC2Ylu8pRS8U+G', 'Tools');
// script/src/Tools.js

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Tools = function () {
    function Tools() {}
    Tools.getMapLength = function (map) {
        var length = 0;
        map.forEach(function (value) {
            length++;
        });
        return length;
    };
    return Tools;
}();
exports.Tools = Tools;

cc._RF.pop();