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
var ScrollView2A = (function (_super) {
    __extends(ScrollView2A, _super);
    function ScrollView2A() {
        var _this = _super.call(this) || this;
        _this.view = null;
        _this.list = null;
        _this.itemPrefab = null;
        _this.spacingY = null;
        _this.data = null;
        _this.rowItemCounts = null;
        _this.items = null;
        _this.topMax = null;
        _this.bottomMax = null;
        _this.lastListY = null;
        _this.itemHeight = null;
        _this.itemMap = new Map();
        return _this;
    }
    ScrollView2A.prototype.onLoad = function () {
        this.resetData();
    };
    ScrollView2A.prototype.resetData = function () {
        this.data = [];
        this.rowItemCounts = 0;
        this.items = [];
        this.topMax = 0;
        this.bottomMax = 0;
        this.lastListY = 0;
        this.itemHeight = 0;
        this.spacingY = 0;
    };
    ScrollView2A.prototype.init = function (data) {
        this.data = data;
        var height = 0;
        var item = cc.instantiate(this.itemPrefab);
        height = item.height;
        this.itemHeight = height;
        this.rowItemCounts = Math.ceil(this.view.height / (height + this.spacingY));
        for (var i = 0; i < 15; ++i) {
            if (data[i] == undefined)
                break;
            var rankItem = item.getComponent('Item2A');
            console.log("更新排行榜item");
            console.log(data[i]);
            rankItem.updateItem(data[i], i);
            this.itemMap.set(item, i);
            this.items.push(item);
            this.list.addChild(item);
            item.x = 0;
            item.y = -(i * (height + this.spacingY));
            if (i < 14) {
                item = cc.instantiate(this.itemPrefab);
            }
        }
        this.list.height = (this.items.length) * height + (this.items.length) * this.spacingY;
        this.topMax = (5 * height + 4 * this.spacingY);
        this.bottomMax = -(this.view.height + this.topMax);
        this.lastListY = this.list.y;
    };
    ScrollView2A.prototype.clearAllData = function () {
        this.itemMap.clear();
        this.list.removeAllChildren();
        this.resetData();
    };
    __decorate([
        property(cc.Node)
    ], ScrollView2A.prototype, "view", void 0);
    __decorate([
        property(cc.Node)
    ], ScrollView2A.prototype, "list", void 0);
    __decorate([
        property(cc.Prefab)
    ], ScrollView2A.prototype, "itemPrefab", void 0);
    ScrollView2A = __decorate([
        ccclass
    ], ScrollView2A);
    return ScrollView2A;
}(cc.Component));
exports.ScrollView2A = ScrollView2A;
