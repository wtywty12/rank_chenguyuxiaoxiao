"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
var BaseCell_1 = require("./common/component/BaseCell");
var ImageHelper_1 = require("./common/helper/ImageHelper");
var NumberUtils_1 = require("./common/helper/NumberUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RankItem = (function (_super) {
    __extends(RankItem, _super);
    function RankItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nameLabel = null;
        _this.scoreLabel = null;
        _this.idLabel = null;
        _this.heroSpr = null;
        _this.heroData = null;
        return _this;
    }
    RankItem.prototype.updateView = function (idx, data) {
        this.heroData = data;
        this.nameLabel.string = this.heroData.nickname;
        var value = this.heroData.KVDataList[0].value;
        this.scoreLabel.string = NumberUtils_1.NumberUtils.convertNumber(value);
        this.idLabel.string = (idx + 1).toString();
        ImageHelper_1.ImageHelper.loadImage(this.heroData.avatarUrl, this.heroSpr);
    };
    __decorate([
        property(cc.Label)
    ], RankItem.prototype, "nameLabel", void 0);
    __decorate([
        property(cc.Label)
    ], RankItem.prototype, "scoreLabel", void 0);
    __decorate([
        property(cc.Label)
    ], RankItem.prototype, "idLabel", void 0);
    __decorate([
        property(cc.Sprite)
    ], RankItem.prototype, "heroSpr", void 0);
    RankItem = __decorate([
        ccclass
    ], RankItem);
    return RankItem;
}(BaseCell_1.BaseCell));
exports.RankItem = RankItem;
