"use strict";
cc._RF.push(module, 'c1a3abY5OFKBqg7fyuqhfgZ', 'DefaultCmdHandler');
// script/src/top/liubowen/core/net/DefaultCmdHandler.js

"use strict";

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var GameCmdHandler_1 = require("./GameCmdHandler");
var DefaultCmdHandler = function (_super) {
    __extends(DefaultCmdHandler, _super);
    function DefaultCmdHandler(cmd, handle) {
        var _this = _super.call(this, cmd) || this;
        _this._handle = handle;
        return _this;
    }
    DefaultCmdHandler.prototype.execute = function (message) {
        this._handle.call(this._handle, message);
    };
    DefaultCmdHandler.of = function (cmd, handle) {
        return new DefaultCmdHandler(cmd, handle);
    };
    return DefaultCmdHandler;
}(GameCmdHandler_1.GameCmdHandler);
exports.DefaultCmdHandler = DefaultCmdHandler;

cc._RF.pop();