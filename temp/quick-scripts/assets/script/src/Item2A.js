(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/src/Item2A.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a6feaQ48qFLW7m9Qr+wUdNB', 'Item2A', __filename);
// script/src/Item2A.js

"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var __extends = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
            }
        };
        return _extendStatics(d, b);
    };
    return function (d, b) {
        _extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ccclass = cc._decorator.ccclass;
var property = cc._decorator.property;
var ImageHelper_1 = require("./ImageHelper");
var Item2A = function (_super) {
    __extends(Item2A, _super);
    function Item2A() {
        var _this = _super.call(this) || this;
        _this.sp_paiming_1 = null;
        _this.sp_paiming_2 = null;
        _this.sp_paiming_3 = null;
        _this.lbl_paiming = null;
        _this.lbl_nickName = null;
        _this.lbl_winGame = null;
        _this.lbl_score = null;
        _this.img_head = null;
        return _this;
    }
    Item2A.prototype.onLoad = function () {};
    Item2A.prototype.onDestroy = function () {};
    Item2A.prototype.updateItem = function (data, index) {
        if (typeof index != "number" || data == undefined) {
            return;
        }
        index++;
        this.setPaiMing(index.toString());
        this.setNickName(data.get("nickname"));
        this.setScore(data.get("score"));
        this.setChenghao(data.get("chenghao"));
        this.setImgHead(data.get("avatarUrl"));
        this.node.active = true;
    };
    Item2A.prototype.setPaiMing = function (str) {
        if (typeof str != "string") {
            return;
        }
        if (+str == 1) {
            this.sp_paiming_1.node.active = true;
            this.lbl_paiming.node.active = false;
        } else if (+str == 2) {
            this.sp_paiming_2.node.active = true;
            this.lbl_paiming.node.active = false;
        } else if (+str == 3) {
            this.sp_paiming_3.node.active = true;
            this.lbl_paiming.node.active = false;
        } else {
            this.lbl_paiming.string = str;
        }
    };
    Item2A.prototype.setNickName = function (str) {
        if (typeof str != "string") {
            return;
        }
        this.lbl_nickName.string = str;
    };
    Item2A.prototype.setChenghao = function (str) {
        if (str == undefined) {
            str = "";
        }
        this.lbl_winGame.string = str;
    };
    Item2A.prototype.setScore = function (str) {
        if (str == undefined) {
            str = 0;
        }
        this.lbl_score.string = Number(str).toString();
    };
    Item2A.prototype.setImgHead = function (url) {
        if (typeof url != "string") {
            return;
        }
        ImageHelper_1.ImageHelper.loadImage(url, this.img_head);
    };
    __decorate([property(cc.Sprite)], Item2A.prototype, "sp_paiming_1", void 0);
    __decorate([property(cc.Sprite)], Item2A.prototype, "sp_paiming_2", void 0);
    __decorate([property(cc.Sprite)], Item2A.prototype, "sp_paiming_3", void 0);
    __decorate([property(cc.Label)], Item2A.prototype, "lbl_paiming", void 0);
    __decorate([property(cc.Label)], Item2A.prototype, "lbl_nickName", void 0);
    __decorate([property(cc.Label)], Item2A.prototype, "lbl_winGame", void 0);
    __decorate([property(cc.Label)], Item2A.prototype, "lbl_score", void 0);
    __decorate([property(cc.Sprite)], Item2A.prototype, "img_head", void 0);
    Item2A = __decorate([ccclass], Item2A);
    return Item2A;
}(cc.Component);
exports.Item2A = Item2A;

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
        //# sourceMappingURL=Item2A.js.map
        