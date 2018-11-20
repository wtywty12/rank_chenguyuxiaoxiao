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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RankView = (function (_super) {
    __extends(RankView, _super);
    function RankView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rankingScrollView = null;
        _this.rankItem = null;
        _this.curIndex = 1;
        _this.indexNum = 5;
        _this.curRankData = [];
        return _this;
    }
    RankView.prototype.start = function () {
        var _this = this;
        wx.onMessage(function (data) {
            if (data.messageType == 0) {
                _this.removeChild();
            }
            else if (data.messageType == 1) {
                _this.fetchFriendData(data.MAIN_MENU_NUM);
            }
            else if (data.messageType == 3) {
                _this.submitScore(data.MAIN_MENU_NUM, data.score);
            }
            else if (data.messageType == 5) {
                _this.fetchGroupFriendData(data.MAIN_MENU_NUM, data.shareTicket);
            }
            else if (data.messageType == 6) {
                _this.upIndex();
            }
            else if (data.messageType == 7) {
                _this.downIndex();
            }
        });
    };
    RankView.prototype.fetchFriendData = function (MAIN_MENU_NUM) {
        var _this = this;
        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            success: function (userRes) {
                var userData = userRes.data[0];
                wx.getFriendCloudStorage({
                    keyList: ["rank" + MAIN_MENU_NUM],
                    success: function (friendRes) {
                        var data = friendRes.data;
                        data.sort(function (a, b) {
                            if (a.KVDataList.length == 0 && b.KVDataList.length == 0) {
                                return 0;
                            }
                            if (a.KVDataList.length == 0) {
                                return 1;
                            }
                            if (b.KVDataList.length == 0) {
                                return -1;
                            }
                            return b.KVDataList[0].value - a.KVDataList[0].value;
                        });
                        cc.log("好友排行榜数据", friendRes, data);
                        _this.crateScroll(data);
                    }
                });
            }
        });
    };
    RankView.prototype.submitScore = function (MAIN_MENU_NUM, score) {
        wx.getUserCloudStorage({
            keyList: ["rank" + MAIN_MENU_NUM],
            success: function (getres) {
                if (getres.KVDataList.length != 0) {
                    if (getres.KVDataList[0].value == "NaN") {
                        wx.setUserCloudStorage({
                            KVDataList: [{ key: "rank" + MAIN_MENU_NUM, value: "" + score }],
                        });
                    }
                    else {
                        wx.setUserCloudStorage({
                            KVDataList: [{
                                    key: "rank" + MAIN_MENU_NUM,
                                    value: "" + (score + parseInt(getres.KVDataList[0].value))
                                }],
                        });
                    }
                }
                else {
                    wx.setUserCloudStorage({
                        KVDataList: [{ key: "rank" + MAIN_MENU_NUM, value: "" + score }],
                    });
                }
            }
        });
    };
    RankView.prototype.fetchGroupFriendData = function (MAIN_MENU_NUM, shareTicket) {
        var _this = this;
        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            success: function (userRes) {
                var userData = userRes.data[0];
                wx.getGroupCloudStorage({
                    shareTicket: shareTicket,
                    keyList: ["rank" + MAIN_MENU_NUM],
                    success: function (resData) {
                        var data = resData.data;
                        data.sort(function (a, b) {
                            if (a.KVDataList.length == 0 && b.KVDataList.length == 0) {
                                return 0;
                            }
                            if (a.KVDataList.length == 0) {
                                return 1;
                            }
                            if (b.KVDataList.length == 0) {
                                return -1;
                            }
                            return b.KVDataList[0].value - a.KVDataList[0].value;
                        });
                        _this.crateScroll(data);
                        cc.log("群排行榜数据", resData, data, shareTicket);
                    },
                    fail: function () {
                        cc.log("分享失败");
                    }
                });
            }
        });
    };
    RankView.prototype.crateScroll = function (data) {
        this.curIndex = 1;
        this.curRankData = data;
        this.rankingScrollView.content.removeAllChildren(true);
        var dataLength = data.length;
        var size = dataLength >= this.indexNum ? this.indexNum : dataLength;
        for (var i = 0; i < size; i++) {
            var item = cc.instantiate(this.rankItem);
            var itemCom = item.getComponent(item.name);
            itemCom.updateView(i, data[i]);
            item.parent = this.rankingScrollView.content;
        }
    };
    RankView.prototype.removeChild = function () {
    };
    RankView.prototype.upIndex = function () {
        if (this.curIndex > 1) {
            this.curIndex -= 1;
            this.rankingScrollView.content.removeAllChildren(true);
            for (var i = (this.curIndex - 1) * this.indexNum; i < this.curRankData.length; i++) {
                var item = cc.instantiate(this.rankItem);
                var itemCom = item.getComponent(item.name);
                itemCom.updateView(i, this.curRankData[i]);
                item.parent = this.rankingScrollView.content;
            }
        }
    };
    RankView.prototype.downIndex = function () {
        if (this.curIndex < Math.ceil(this.curRankData.length / this.indexNum)) {
            this.curIndex += 1;
            this.rankingScrollView.content.removeAllChildren(true);
            for (var i = (this.curIndex - 1) * this.indexNum; i < this.curRankData.length; i++) {
                var item = cc.instantiate(this.rankItem);
                var itemCom = item.getComponent(item.name);
                itemCom.updateView(i, this.curRankData[i]);
                item.parent = this.rankingScrollView.content;
            }
        }
    };
    __decorate([
        property(cc.ScrollView)
    ], RankView.prototype, "rankingScrollView", void 0);
    __decorate([
        property(cc.Prefab)
    ], RankView.prototype, "rankItem", void 0);
    RankView = __decorate([
        ccclass
    ], RankView);
    return RankView;
}(cc.Component));
exports.RankView = RankView;
