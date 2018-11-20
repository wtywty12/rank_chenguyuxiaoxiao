(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/src/top/liubowen/core/utils/UrlUtils.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dadd3KLpDZC/5xuPHZ5xHIk', 'UrlUtils', __filename);
// script/src/top/liubowen/core/utils/UrlUtils.js

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UrlUtils = function () {
    function UrlUtils() {}
    UrlUtils.getUrlParams = function () {
        var params = new Map();
        if (window.location == null) {
            return params;
        }
        var url = window.location.href;
        var num = url.indexOf("?");
        var str = url.substr(num + 1);
        var arr = str.split("&");
        for (var i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                var name_1 = arr[i].substring(0, num);
                var value = arr[i].substr(num + 1);
                params.set(name_1, value);
            }
        }
        return params;
    };
    return UrlUtils;
}();
exports.UrlUtils = UrlUtils;

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
        //# sourceMappingURL=UrlUtils.js.map
        