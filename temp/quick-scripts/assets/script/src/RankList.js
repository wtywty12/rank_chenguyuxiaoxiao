(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/src/RankList.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '58cadLnduFI/7Y2k+6GZTs1', 'RankList', __filename);
// script/src/RankList.js

"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
var RankListClass = function () {
    function RankListClass() {
        this.rankNode = null;
        this.rankList = null;
        this.friendRankData = [];
    }
    RankListClass_1 = RankListClass;
    Object.defineProperty(RankListClass, "instance", {
        get: function get() {
            if (this._instance == null) {
                this._instance = new RankListClass_1();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    RankListClass.prototype.setFriendRankData = function (data, layout, rankNode) {
        var _this = this;
        this.rankList = layout;
        this.rankNode = rankNode;
        data.forEach(function (value, key) {
            _this.pushRankItem(value, key + 1);
            _this.pushRankItem(value, key + 1);
            _this.pushRankItem(value, key + 1);
        });
    };
    RankListClass.prototype.pushRankItem = function (data, index) {
        var node = cc.instantiate(this.rankNode);
        node.setPosition(0, 0);
        var rankItem = node.getComponent("RankItem");
        rankItem.setPaiMing(index.toString());
        rankItem.setNickName(data.get("nickname"));
        rankItem.setScore(data.get("score"));
        rankItem.setWinGame(data.get("level"));
        rankItem.setImgHead(data.get("avatarUrl"));
        node.active = true;
        this.rankList.node.addChild(node);
    };
    var RankListClass_1;
    RankListClass = RankListClass_1 = __decorate([ccclass], RankListClass);
    return RankListClass;
}();
exports.RankListClass = RankListClass;
exports.RankList = RankListClass.instance;

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
        //# sourceMappingURL=RankList.js.map
        