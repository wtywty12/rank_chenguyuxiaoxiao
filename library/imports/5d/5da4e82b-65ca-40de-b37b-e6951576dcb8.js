"use strict";
cc._RF.push(module, '5da4egrZcpA3rN75pUVdty4', 'RankLayer');
// script/src/RankLayer.js

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
var RankLayer = function (_super) {
    __extends(RankLayer, _super);
    function RankLayer() {
        var _this = _super.call(this) || this;
        _this.myRankNode = null;
        _this.scrollView = null;
        _this.sv = null;
        return _this;
    }
    RankLayer.prototype.start = function () {
        var _this = this;
        wx.onMessage(function (event) {
            console.log("收到主域Message => ", event);
            var eventType = event.EventType;
            var eventData = event.EventData;
            switch (eventType) {
                case "0":
                    _this.createFriendRankList();
                    break;
                case "1":
                    _this.updateFrientRankList();
                    break;
                case "2":
                    _this.submitTopScore(eventData.score, eventData.level);
                    break;
                case "3":
                    _this.sv.clearAllData();
                    break;
                default:
                    console.log("主域消息没有被使用,消息Type = " + eventType);
                    break;
            }
        });
    };
    RankLayer.prototype.createFriendRankList = function () {
        var _this = this;
        wx.getFriendCloudStorage({
            keyList: ["topScore"],
            success: function success(event) {
                var data = event.data;
                var newData = _this.parseRankData(data);
                _this.sortRankInfo(newData);
                console.log("好友排行榜数据 => ", newData);
                _this.sv = _this.scrollView.getComponent("ScrollView");
                var a = newData.concat(newData);
                var b = a.concat(a);
                _this.sv.init(b);
            }
        });
    };
    RankLayer.prototype.parseRankData = function (data) {
        var newData = [];
        data.forEach(function (value, key) {
            var kvData = value.KVDataList[0] || [];
            var avatarUrl = value.avatarUrl || "";
            var nickname = value.nickname || "";
            var openid = value.openid || "";
            newData[key] = new Map();
            var map = newData[key];
            map.set("avatarUrl", avatarUrl);
            map.set("nickname", nickname);
            map.set("openid", openid);
            var jsonStr = kvData.value;
            if (jsonStr != null && jsonStr != "") {
                var jsonObj = JSON.parse(jsonStr);
                var wxgame = jsonObj.wxgame;
                if (wxgame != null) {
                    var score = wxgame.score;
                    var level = wxgame.level;
                    var update_time = wxgame.update_time;
                    map.set("score", score);
                    map.set("level", level);
                    map.set("update_time", update_time);
                }
            }
        });
        return newData;
    };
    RankLayer.prototype.sortRankInfo = function (data) {
        data.sort(function (a, b) {
            var sa = a.get("score");
            var sb = b.get("score");
            if (sa == null && sb == null) {
                return 0;
            }
            if (sa == null) {
                return 1;
            }
            if (sb == null) {
                return -1;
            }
            return sb - sa;
        });
    };
    RankLayer.prototype.updateFrientRankList = function () {
        wx.getFriendCloudStorage({
            keyList: ["topScore"],
            success: function success(event) {
                var data = event.data;
                console.log("好友排行榜数据 => ", data);
            }
        });
    };
    RankLayer.prototype.submitTopScore = function (score, level) {
        if (typeof score != "number" && typeof level != "number") {
            console.log("score or level is not number!");
            return;
        }
        console.log("排行榜设置用户最高分 = " + score);
        var jsonObj = {
            "wxgame": {
                "level": level,
                "score": score,
                "update_time": new Date().getTime()
            }
        };
        var jsonStr = JSON.stringify(jsonObj);
        console.log("jsonStr = " + jsonStr);
        wx.setUserCloudStorage({ KVDataList: [{ key: "topScore", value: jsonStr }] });
    };
    __decorate([property(cc.Node)], RankLayer.prototype, "myRankNode", void 0);
    __decorate([property(cc.ScrollView)], RankLayer.prototype, "scrollView", void 0);
    RankLayer = __decorate([ccclass], RankLayer);
    return RankLayer;
}(cc.Component);
exports.RankLayer = RankLayer;

cc._RF.pop();