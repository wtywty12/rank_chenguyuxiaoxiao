(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/src/Rank2B.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd1d62Er1x9HJYhicD+UWIQH', 'Rank2B', __filename);
// script/src/Rank2B.js

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
var propert = cc._decorator.property;
var ccclass = cc._decorator.ccclass;
var ImageHelper_1 = require("./ImageHelper");
var Rank2B = function (_super) {
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
        _this.datas = [];
        _this.moveTime = null;
        return _this;
    }
    Rank2B.prototype.initView = function (datas) {
        this.moveTime = 0.5;
        this.ranks = [this.rank_1, this.rank_2, this.rank_3];
        this.heads = [this.head_1, this.head_2, this.head_3];
        this.scores = [this.score_1, this.score_2, this.score_3];
        this.updateView(datas);
    };
    Rank2B.prototype.updateView = function (datas) {
        this.datas = datas;
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
            rank.runAction(moveBy);
        }
    };
    Rank2B.prototype.updateItemInfo = function () {
        for (var i = 0; i < 3; i++) {
            var head = this.heads[i];
            var score = this.scores[i];
            var data = this.datas[i];
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
    __decorate([propert(cc.Node)], Rank2B.prototype, "rank_1", void 0);
    __decorate([propert(cc.Node)], Rank2B.prototype, "rank_2", void 0);
    __decorate([propert(cc.Node)], Rank2B.prototype, "rank_3", void 0);
    __decorate([propert(cc.Sprite)], Rank2B.prototype, "head_1", void 0);
    __decorate([propert(cc.Sprite)], Rank2B.prototype, "head_2", void 0);
    __decorate([propert(cc.Sprite)], Rank2B.prototype, "head_3", void 0);
    __decorate([propert(cc.Label)], Rank2B.prototype, "score_1", void 0);
    __decorate([propert(cc.Label)], Rank2B.prototype, "score_2", void 0);
    __decorate([propert(cc.Label)], Rank2B.prototype, "score_3", void 0);
    Rank2B = __decorate([ccclass()], Rank2B);
    return Rank2B;
}(cc.Component);
exports.Rank2B = Rank2B;

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
        //# sourceMappingURL=Rank2B.js.map
        