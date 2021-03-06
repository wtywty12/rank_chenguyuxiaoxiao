import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import {RankList} from "./RankList";
import {ScrollView} from "./ScrollView";

@ccclass
export class RankLayer extends cc.Component {

    /** prefab */
    @property(cc.Node)
    private myRankNode: cc.Node = null;

    /** scrollview */
    @property(cc.ScrollView)
    private scrollView: cc.ScrollView = null;

    private sv: ScrollView = null;

    protected constructor() {
        super();
    }

    /**
     * 组件第一次加载前 用于接收主域发来的消息
     */
    start() {
        wx.onMessage((event: any) => {
            console.log("收到主域Message => ", event);
            var eventType = event.EventType;
            var eventData = event.EventData;
            switch(eventType) {
                case "0":
                    this.createFriendRankList();
                    break;
                case "1":
                    this.updateFrientRankList();
                    break;
                case "2":
                    this.submitTopScore(eventData.score, eventData.level);
                    break;
                case "3":
                    this.sv.clearAllData();
                    break;
                default:
                    console.log("主域消息没有被使用,消息Type = " + eventType);
                    break;
            }
        })
    }

    /**
     * 创建好友排行榜列表
     */
    private createFriendRankList() {
        wx.getFriendCloudStorage({
            keyList: ["topScore"],
            success: (event: any) => {
                let data: Array<any> = event.data;
                let newData = this.parseRankData(data);
                this.sortRankInfo(newData);
                console.log("好友排行榜数据 => ", newData);
                /** 异步 所以回调处理UI */
                this.sv = this.scrollView.getComponent("ScrollView");
                var a = newData.concat(newData);
                var b = a.concat(a);
                this.sv.init(b);
                // RankList.setFriendRankData(newData, this.layout, this.rankNode);
            }
        })
    }

    /**
     * 解析数据
     */
    private parseRankData(data: Array<any>): Array<any> {
        var newData: Array<any> = [];
        data.forEach((value, key) => {
            /** 暂时只上传下载一组数据 如增多需扩展此处 */
            let kvData = value.KVDataList[0] || [];
            /** 头像URL */
            let avatarUrl = value.avatarUrl || "";
            /** 玩家昵称 */
            let nickname = value.nickname || "";
            /** openid */
            let openid = value.openid || "";
            newData[key] = new Map<string, any>();
            let map: Map<string, any> = newData[key];
            map.set("avatarUrl", avatarUrl);
            map.set("nickname", nickname);
            map.set("openid", openid);
            let jsonStr = kvData.value;
            if (jsonStr != null && jsonStr != "") {
                let jsonObj = JSON.parse(jsonStr);
                let wxgame = jsonObj.wxgame;
                if (wxgame != null) {
                    let score = wxgame.score;
                    let level = wxgame.level;
                    let update_time = wxgame.update_time;
                    map.set("score", score);
                    map.set("level", level);
                    map.set("update_time", update_time);
                }
            }
        })
        return newData;
    }

    /**
     * 排序排行榜列表数据
     */
    private sortRankInfo(data: Array<Map<string, any>>) {
        data.sort((a: Map<string, any>, b: Map<string, any>) => {
            let sa = a.get("score");
            let sb = b.get("score");
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
        })
    }

    /**
     * 更新好友排行榜列表
     */
    private updateFrientRankList() {
        wx.getFriendCloudStorage({
            keyList: ["topScore"],
            success: (event: any) => {
                let data = event.data;
                console.log("好友排行榜数据 => ", data);
                /** 异步 所以回调处理UI */
            }
        })
    }

    /**
     * 提交玩家最高分到排行榜
     */
    private submitTopScore(score: number, level: number) {
        if (typeof(score) != "number" && typeof(level) != "number") {
            console.log("score or level is not number!");
            return;
        }
        console.log("排行榜设置用户最高分 = " + score);
        var jsonObj = {
            "wxgame": {
                  "level": level,
                  "score": score,
                  "update_time": new Date().getTime(),
            },
        };
        var jsonStr = JSON.stringify(jsonObj);
        console.log("jsonStr = " + jsonStr);
        wx.setUserCloudStorage({KVDataList: [{key: "topScore", value: jsonStr}]});
    }
}