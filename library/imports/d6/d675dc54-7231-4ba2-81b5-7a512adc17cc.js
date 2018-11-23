"use strict";
cc._RF.push(module, 'd675dxUcjFLooG1elEq3BfM', 'RankItem');
// script/src/RankItem.js

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
var RankItem = function (_super) {
    __extends(RankItem, _super);
    function RankItem() {
        var _this = _super.call(this) || this;
        _this.lbl_paiming = null;
        _this.lbl_nickName = null;
        _this.lbl_winGame = null;
        _this.lbl_score = null;
        _this.img_head = null;
        return _this;
    }
    RankItem.prototype.onLoad = function () {};
    RankItem.prototype.onDestroy = function () {};
    RankItem.prototype.updateItem = function (data, index) {
        if (typeof index != "number" || data == undefined) {
            return;
        }
        index++;
        this.setPaiMing(index.toString());
        this.setNickName(data.get("nickname"));
        this.setScore(data.get("score"));
        this.setWinGame(data.get("level"));
        this.setImgHead(data.get("avatarUrl"));
        this.node.active = true;
    };
    RankItem.prototype.setPaiMing = function (str) {
        if (typeof str != "string") {
            return;
        }
        this.lbl_paiming.string = str;
    };
    RankItem.prototype.setNickName = function (str) {
        if (typeof str != "string") {
            return;
        }
        this.lbl_nickName.string = str;
    };
    RankItem.prototype.setWinGame = function (str) {
        if (str == undefined) {
            str = 0;
        }
        this.lbl_winGame.string = "闯关数:" + Number(str).toString();
    };
    RankItem.prototype.setScore = function (str) {
        if (str == undefined) {
            str = 0;
        }
        this.lbl_score.string = Number(str).toString();
    };
    RankItem.prototype.setImgHead = function (url) {
        if (typeof url != "string") {
            return;
        }
        ImageHelper_1.ImageHelper.loadImage(url, this.img_head);
    };
    __decorate([property(cc.Label)], RankItem.prototype, "lbl_paiming", void 0);
    __decorate([property(cc.Label)], RankItem.prototype, "lbl_nickName", void 0);
    __decorate([property(cc.Label)], RankItem.prototype, "lbl_winGame", void 0);
    __decorate([property(cc.Label)], RankItem.prototype, "lbl_score", void 0);
    __decorate([property(cc.Sprite)], RankItem.prototype, "img_head", void 0);
    RankItem = __decorate([ccclass], RankItem);
    return RankItem;
}(cc.Component);
exports.RankItem = RankItem;

cc._RF.pop();