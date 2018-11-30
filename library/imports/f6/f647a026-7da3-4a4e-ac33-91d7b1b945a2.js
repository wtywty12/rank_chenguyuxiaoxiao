"use strict";
cc._RF.push(module, 'f647aAmfaNKTqwzkdexuUWi', 'ScrollView');
// script/src/ScrollView.js

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
var ScrollView = function (_super) {
    __extends(ScrollView, _super);
    function ScrollView() {
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
    ScrollView.prototype.onLoad = function () {
        this.resetData();
    };
    ScrollView.prototype.resetData = function () {
        this.data = [];
        this.rowItemCounts = 0;
        this.items = [];
        this.topMax = 0;
        this.bottomMax = 0;
        this.lastListY = 0;
        this.itemHeight = 0;
        this.spacingY = 10;
    };
    ScrollView.prototype.init = function (data) {
        this.data = data;
        var height = 0;
        var item = cc.instantiate(this.itemPrefab);
        height = item.height;
        this.itemHeight = height;
        this.rowItemCounts = Math.ceil(this.view.height / (height + this.spacingY));
        for (var i = 0; i < 15; ++i) {
            if (data[i] == undefined) break;
            var rankItem = item.getComponent('RankItem');
            rankItem.updateItem(data[i], i);
            this.itemMap.set(item, i);
            this.items.push(item);
            this.list.addChild(item);
            item.x = 0;
            item.y = -(height / 2 + i * (height + this.spacingY));
            if (i < 14) {
                item = cc.instantiate(this.itemPrefab);
            }
        }
        this.list.height = this.items.length * height + this.items.length * this.spacingY;
        this.topMax = 5 * height + 4 * this.spacingY;
        this.bottomMax = -(this.view.height + this.topMax);
        this.lastListY = this.list.y;
    };
    ScrollView.prototype.clearAllData = function () {
        this.itemMap.clear();
        this.list.removeAllChildren();
        this.resetData();
    };
    __decorate([property(cc.Node)], ScrollView.prototype, "view", void 0);
    __decorate([property(cc.Node)], ScrollView.prototype, "list", void 0);
    __decorate([property(cc.Prefab)], ScrollView.prototype, "itemPrefab", void 0);
    ScrollView = __decorate([ccclass], ScrollView);
    return ScrollView;
}(cc.Component);
exports.ScrollView = ScrollView;

cc._RF.pop();