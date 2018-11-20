(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/src/top/liubowen/core/net/Http.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fd93f3z5NpG3aL4BWCXpGQb', 'Http', __filename);
// script/src/top/liubowen/core/net/Http.js

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Http = function () {
    function Http(baseURL) {
        this.baseURL = baseURL;
    }
    Http.prototype.httpGet = function (url, success, error) {
        if (error === void 0) {
            error = null;
        }
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    var response = JSON.parse(xhr.responseText);
                    if (success != null) {
                        success(response);
                    }
                } else {
                    if (error != null) {
                        error({ "status": xhr.status });
                    }
                }
            }
        };
        xhr.open("GET", this.baseURL + url, true);
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }
        xhr.ontimeout = function (event) {
            if (error != null) {
                error(event);
            }
        };
        xhr.onerror = function (event) {
            if (error != null) {
                error(event);
            }
        };
        xhr.timeout = 3000;
        xhr.send();
    };
    Http.prototype.httpPost = function (url, params, success, error) {
        if (error === void 0) {
            error = null;
        }
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    var response = JSON.parse(xhr.responseText);
                    if (success != null) {
                        success(response);
                    }
                } else {
                    if (error != null) {
                        error({ "status": xhr.status });
                    }
                }
            }
        };
        xhr.open("POST", this.baseURL + url, true);
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.ontimeout = function (event) {
            if (error != null) {
                error(event);
            }
        };
        xhr.onerror = function (event) {
            if (error != null) {
                error(event);
            }
        };
        xhr.timeout = 5000;
        xhr.send(this.encodeFormData(params));
    };
    Http.prototype.encodeFormData = function (data) {
        var pairs = [];
        var regexp = /%20/g;
        for (var name_1 in data) {
            var value = data[name_1];
            var pair = encodeURIComponent(name_1).replace(regexp, "+") + "=" + encodeURIComponent(value).replace(regexp, "+");
            pairs.push(pair);
        }
        return pairs.join("&");
    };
    return Http;
}();
exports.Http = Http;

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
        //# sourceMappingURL=Http.js.map
        