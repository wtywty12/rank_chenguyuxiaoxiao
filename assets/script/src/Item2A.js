"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ccclass = cc._decorator.ccclass;
var property = cc._decorator.property;
var ImageHelper_1 = require("./ImageHelper");
var Item2A = (function (_super) {
    __extends(Item2A, _super);
    function Item2A() {
        var _this = _super.call(this) || this;
        _this.lbl_paiming = null;
        _this.lbl_nickName = null;
        _this.lbl_winGame = null;
        _this.lbl_score = null;
        _this.img_head = null;
        return _this;
    }
    Item2A.prototype.onLoad = function () {
    };
    Item2A.prototype.onDestroy = function () {
    };
    Item2A.prototype.updateItem = function (data, index) {
        if (typeof (index) != "number" || data == undefined) {
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
        if (typeof (str) != "string") {
            return;
        }
        this.lbl_paiming.string = str;
    };
    Item2A.prototype.setNickName = function (str) {
        if (typeof (str) != "string") {
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
        if (typeof (url) != "string") {
            return;
        }
        ImageHelper_1.ImageHelper.loadImage(url, this.img_head);
    };
    __decorate([
        property(cc.Label)
    ], Item2A.prototype, "lbl_paiming", void 0);
    __decorate([
        property(cc.Label)
    ], Item2A.prototype, "lbl_nickName", void 0);
    __decorate([
        property(cc.Label)
    ], Item2A.prototype, "lbl_winGame", void 0);
    __decorate([
        property(cc.Label)
    ], Item2A.prototype, "lbl_score", void 0);
    __decorate([
        property(cc.Sprite)
    ], Item2A.prototype, "img_head", void 0);
    Item2A = __decorate([
        ccclass
    ], Item2A);
    return Item2A;
}(cc.Component));
exports.Item2A = Item2A;
