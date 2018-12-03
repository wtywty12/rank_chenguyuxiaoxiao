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
var Rank2A = (function (_super) {
    __extends(Rank2A, _super);
    function Rank2A() {
        var _this = _super.call(this) || this;
        _this.rank2A = null;
        _this.rank2B = null;
        _this.scrollView = null;
        _this.my_paiming = null;
        _this.sv = null;
        _this.r2b = null;
        return _this;
    }
    Rank2A.prototype.start = function () {
        var _this = this;
        wx.onMessage(function (event) {
            console.log("收到主域Message => ", event);
            var eventType = event.EventType;
            var eventData = event.EventData;
            switch (eventType) {
                case "0":
                    _this.createFriendRankList(eventData);
                    break;
                case "1":
                    _this.updateFrientRankList();
                    break;
                case "2":
                    _this.submitTopScore(eventData.score, eventData.chenghao, eventData.playerId);
                    break;
                case "3":
                    _this.sv.clearAllData();
                    break;
                case "4":
                    _this.initItem2B();
                    break;
                case "5":
                    _this.updateItem2B();
                    break;
                default:
                    console.log("主域消息没有被使用,消息Type = " + eventType);
                    break;
            }
        });
    };
    Rank2A.prototype.initItem2B = function () {
        this.rank2A.active = false;
        this.rank2B.active = true;
        var rank2b = this.rank2B.getComponent("Rank2B");
        this.getBorderFriend(function (datas) {
            rank2b.initView(datas);
        });
    };
    Rank2A.prototype.updateItem2B = function () {
        var rank2b = this.rank2B.getComponent("Rank2B");
        this.getBorderFriend(function (datas) {
            rank2b.updateView(datas);
        });
    };
    Rank2A.prototype.getBorderFriend = function (cb) {
        var _this = this;
        wx.getFriendCloudStorage({
            keyList: ["topScore"],
            success: function (event) {
                var data = event.data;
                var newData = _this.parseRankData(data);
                _this.sortRankInfo(newData);
                console.log("好友排行榜数据 => ", newData);
                cb(newData);
            }
        });
    };
    Rank2A.prototype.createFriendRankList = function (playerId) {
        var _this = this;
        this.rank2A.active = true;
        this.rank2B.active = false;
        wx.getFriendCloudStorage({
            keyList: ["topScore_2A"],
            success: function (event) {
                var data = event.data;
                var newData = _this.parseRankData(data);
                _this.sortRankInfo(newData);
                console.log("好友排行榜数据 => ", newData);
                _this.sv = _this.scrollView.getComponent("ScrollView2A");
                _this.sv.init(newData);
                var index = 0;
                newData.forEach(function (value) {
                    index++;
                    console.log("playerId = " + playerId);
                    console.log("vp = " + value.get("playerId"));
                    if (+playerId == value.get("playerId")) {
                        _this.my_paiming.string = index.toString();
                        return;
                    }
                });
            }
        });
    };
    Rank2A.prototype.parseRankData = function (data) {
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
                    var chenghao = wxgame.chenghao;
                    var playerId = wxgame.playerId;
                    var update_time = wxgame.update_time;
                    map.set("score", score);
                    map.set("chenghao", chenghao);
                    map.set("playerId", playerId);
                    map.set("update_time", update_time);
                }
            }
        });
        return newData;
    };
    Rank2A.prototype.sortRankInfo = function (data) {
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
    Rank2A.prototype.updateFrientRankList = function () {
        wx.getFriendCloudStorage({
            keyList: ["topScore_2A"],
            success: function (event) {
                var data = event.data;
                console.log("好友排行榜数据 => ", data);
            }
        });
    };
    Rank2A.prototype.submitTopScore = function (score, chenghao, playerId) {
        if (typeof (score) != "number" && typeof (chenghao) != "string") {
            console.log("score or chenghao is not number!");
            return;
        }
        console.log("排行榜设置用户最高分 = " + score);
        var jsonObj = {
            "wxgame": {
                "chenghao": chenghao,
                "score": score,
                "playerId": playerId,
                "update_time": new Date().getTime(),
            },
        };
        var jsonStr = JSON.stringify(jsonObj);
        console.log("jsonStr = " + jsonStr);
        wx.setUserCloudStorage({ KVDataList: [{ key: "topScore_2A", value: jsonStr }] });
    };
    __decorate([
        property(cc.Node)
    ], Rank2A.prototype, "rank2A", void 0);
    __decorate([
        property(cc.Node)
    ], Rank2A.prototype, "rank2B", void 0);
    __decorate([
        property(cc.ScrollView)
    ], Rank2A.prototype, "scrollView", void 0);
    __decorate([
        property(cc.Label)
    ], Rank2A.prototype, "my_paiming", void 0);
    Rank2A = __decorate([
        ccclass
    ], Rank2A);
    return Rank2A;
}(cc.Component));
exports.Rank2A = Rank2A;
