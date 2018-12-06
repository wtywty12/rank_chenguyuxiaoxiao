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
var propert = cc._decorator.property;
var ccclass = cc._decorator.ccclass;
var ImageHelper_1 = require("./ImageHelper");
var Rank2B = (function (_super) {
    __extends(Rank2B, _super);
    function Rank2B() {
        var _this = _super.call(this) || this;
        _this.rank_1 = null;
        _this.rank_2 = null;
        _this.rank_3 = null;
        _this.head_1 = null;
        _this.head_2 = null;
        _this.head_3 = null;
        _this.score_1 = null;
        _this.score_2 = null;
        _this.score_3 = null;
        _this.ranks = [];
        _this.heads = [];
        _this.scores = [];
        _this.old_datas = [];
        _this.datas = [];
        _this.pmIndex = -1;
        _this.old_pmIndex = -1;
        _this.mySore = -1;
        _this.upScore = -1;
        _this.downScore = -1;
        _this.isUpMove = null;
        _this.playerId = null;
        _this.moveTime = null;
        return _this;
    }
    Rank2B.prototype.initView = function (datas, playerId) {
        this.moveTime = 0.5;
        this.ranks = [this.rank_1, this.rank_2, this.rank_3];
        this.heads = [this.head_1, this.head_2, this.head_3];
        this.scores = [this.score_1, this.score_2, this.score_3];
        this.old_datas = datas;
        this.playerId = playerId;
        this.updateItemInfo(1);
    };
    Rank2B.prototype.updateView = function (datas, playerId) {
        this.datas = datas;
        this.playerId = playerId;
        this.updateItemInfo(2);
    };
    Rank2B.prototype.analyData = function (playerId) {
        console.log(this.datas);
        console.log(this.old_datas);
        for (var i = 0; i < this.datas.length; i++) {
            var data = this.datas[i];
            if (+playerId == data.get("playerId")) {
                this.pmIndex = i;
                break;
            }
        }
        console.log("this.pmIndex = " + this.pmIndex);
        if (this.pmIndex != -1) {
            for (var i = 0; i < 3; i++) {
                var data = this.old_datas[i];
                if (+playerId == data.get("playerId")) {
                    this.old_pmIndex = i;
                    break;
                }
            }
            console.log("old_pmIndex = " + this.old_pmIndex);
            if (this.pmIndex < this.old_pmIndex) {
                console.log("i = " + i);
                if (i != 0) {
                    this.upScore = this.datas[i - 1].get("score");
                    this.mySore = data.get("score");
                    if (this.mySore < this.upScore) {
                        this.isUpMove = true;
                        this.playEffect();
                    }
                }
            }
            else if (this.pmIndex > this.old_pmIndex) {
                console.log("di = " + i);
                if (i != 2) {
                    this.downScore = this.datas[i + 1].get("score");
                    this.mySore = data.get("score");
                    if (this.mySore > this.downScore) {
                        this.isUpMove = false;
                        this.playEffect();
                    }
                }
            }
        }
    };
    Rank2B.prototype.playEffect = function () {
        var cb1 = cc.callFunc(this.playEffect1, this);
        var dt = cc.delayTime(this.moveTime);
        var uf = cc.callFunc(this.updateItemInfo, this);
        var cb2 = cc.callFunc(this.playEffect2, this);
        this.node.runAction(cc.sequence(cb1, dt, uf, cb2));
    };
    Rank2B.prototype.playEffect1 = function () {
        for (var i = 0; i < 3; i++) {
            var rank = this.ranks[i];
            var width = rank.width;
            var moveBy = cc.moveBy(this.moveTime, cc.v2(width, 0));
            console.log("isUpMove = " + this.isUpMove);
            if (this.isUpMove) {
                if (i == this.pmIndex) {
                    var upRank = this.ranks[this.pmIndex - 1];
                    var x = rank.x;
                    var y = rank.y;
                    var upMoveTo = cc.moveTo(this.moveTime, cc.v2(x, y));
                    upRank.runAction(cc.spawn(moveBy, upMoveTo));
                    var ux = upRank.x;
                    var uy = upRank.y;
                    var moveTo = cc.moveTo(this.moveTime, cc.v2(ux, uy));
                    rank.runAction(cc.spawn(moveBy, moveTo));
                }
            }
            else {
                if (i == this.pmIndex) {
                    var downRank = this.ranks[this.pmIndex - 1];
                    var x = rank.x;
                    var y = rank.y;
                    var upMoveTo = cc.moveTo(this.moveTime, cc.v2(x, y));
                    downRank.runAction(cc.spawn(moveBy, upMoveTo));
                    var dx = downRank.x;
                    var dy = downRank.y;
                    var moveTo = cc.moveTo(this.moveTime, cc.v2(dx, dy));
                    rank.runAction(cc.spawn(moveBy, moveTo));
                }
            }
        }
    };
    Rank2B.prototype.updateItemInfo = function (type) {
        var datas = null;
        if (type == 1) {
            datas = this.old_datas;
        }
        else {
            datas = this.datas;
        }
        var length = datas.length;
        var max = length < 3 && length || 3;
        console.log(this.playerId);
        console.log("AA");
        for (var i = 0; i < datas.length; i++) {
            var value = datas[i];
            console.log(value.get("playerId"));
            if (value.get("playerId") == +this.playerId) {
                this.pmIndex = i;
                break;
            }
        }
        console.log(datas);
        console.log("pd = " + this.pmIndex);
        if (this.pmIndex == -1) {
            this.rank_1.active = false;
            this.rank_2.active = false;
            this.rank_3.active = false;
            return;
        }
        for (var i = 0; i < 3; i++) {
            var head = this.heads[i];
            var score = this.scores[i];
            if (this.pmIndex == 0 && i == 0) {
                this.rank_1.active = true;
                var data = datas[0];
                ImageHelper_1.ImageHelper.loadImage(data.get("avatarUrl"), head);
                score.string = Number(data.get("score")).toString();
                this.rank_2.active = false;
                this.rank_3.active = false;
                return;
            }
            var data = datas[i + this.pmIndex - 1];
            console.log(typeof (data));
            if (typeof data == "undefined") {
                console.log("xi = " + i);
                this.ranks[i].active = false;
                continue;
            }
            this.ranks[i].active = true;
            ImageHelper_1.ImageHelper.loadImage(data.get("avatarUrl"), head);
            score.string = Number(data.get("score")).toString();
        }
    };
    Rank2B.prototype.playEffect2 = function () {
        for (var i = 0; i < 3; i++) {
            var rank = this.ranks[i];
            var width = rank.width;
            var moveBy = cc.moveBy(this.moveTime, cc.v2(-width, 0));
            rank.runAction(moveBy);
        }
    };
    __decorate([
        propert(cc.Node)
    ], Rank2B.prototype, "rank_1", void 0);
    __decorate([
        propert(cc.Node)
    ], Rank2B.prototype, "rank_2", void 0);
    __decorate([
        propert(cc.Node)
    ], Rank2B.prototype, "rank_3", void 0);
    __decorate([
        propert(cc.Sprite)
    ], Rank2B.prototype, "head_1", void 0);
    __decorate([
        propert(cc.Sprite)
    ], Rank2B.prototype, "head_2", void 0);
    __decorate([
        propert(cc.Sprite)
    ], Rank2B.prototype, "head_3", void 0);
    __decorate([
        propert(cc.Label)
    ], Rank2B.prototype, "score_1", void 0);
    __decorate([
        propert(cc.Label)
    ], Rank2B.prototype, "score_2", void 0);
    __decorate([
        propert(cc.Label)
    ], Rank2B.prototype, "score_3", void 0);
    Rank2B = __decorate([
        ccclass()
    ], Rank2B);
    return Rank2B;
}(cc.Component));
exports.Rank2B = Rank2B;
