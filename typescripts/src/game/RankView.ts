/**
 * User: lizhen
 * Note: RankView
 */
import {RankItem} from "./RankItem";

const {ccclass, property} = cc._decorator;

@ccclass
export class RankView extends cc.Component {
    @property(cc.ScrollView)
    private rankingScrollView: cc.ScrollView = null;
    @property(cc.Prefab)
    private rankItem: cc.Prefab = null;

    private curIndex: number = 1;//默认分页
    private indexNum: number = 5;//每一页的数量
    private curRankData: any = [];//当前排行榜数据

    start() {
        // if(CC_WECHATGAME){
        wx.onMessage((data: any) => {
            console.log("接收主域消息 ： ", data);
            if (data.messageType == 0) {
                this.removeChild();
            } else if (data.messageType == 1) {
                this.fetchFriendData(data.MAIN_MENU_NUM);
            } else if (data.messageType == 3) {
                this.submitScore(data.MAIN_MENU_NUM, data.score);
            } else if (data.messageType == 5) {
                this.fetchGroupFriendData(data.MAIN_MENU_NUM, data.shareTicket);
            } else if (data.messageType == 6) {
                // 上一页
                this.upIndex();
            } else if (data.messageType == 7) {
                // 下一页
                this.downIndex();
            }
        })
        // }
    }

    private fetchFriendData(MAIN_MENU_NUM: any) {//获取好友排行榜数据
        // this.rankingScrollView.node.active = true;
        // if(CC_WECHATGAME){
        console.log("fetchFriendData ： ", MAIN_MENU_NUM); 
        cc.log("fetchFriendData ： ", MAIN_MENU_NUM); 
        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            success: (userRes: any) => {
                let userData = userRes.data[0];
                wx.getFriendCloudStorage({
                    keyList: ["rank" + MAIN_MENU_NUM],
                    success: (friendRes: any) => {
                        let data = friendRes.data;
                        // @ts-ignore
                        data.sort((a: any, b: any) => {
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
                        this.crateScroll(data);
                    }
                })
            }
        })
        // }
    }

    private submitScore(MAIN_MENU_NUM: any, score: any) {//提交分数
        // if(CC_WECHATGAME){
        wx.getUserCloudStorage({
            keyList: ["rank" + MAIN_MENU_NUM],
            success: function (getres: any) {
                // console.log("getUserCloudStorage", getres);
                if (getres.KVDataList.length != 0) {
                    if (getres.KVDataList[0].value == "NaN") {
                        wx.setUserCloudStorage({
                            KVDataList: [{key: "rank" + MAIN_MENU_NUM, value: "" + score}],
                        })
                    } else {
                        wx.setUserCloudStorage({
                            KVDataList: [{
                                key: "rank" + MAIN_MENU_NUM,
                                value: "" + (score + parseInt(getres.KVDataList[0].value))
                            }],
                        })
                    }
                } else {
                    wx.setUserCloudStorage({
                        KVDataList: [{key: "rank" + MAIN_MENU_NUM, value: "" + score}],
                    })
                }
            }
        })
        // }
    }

    private fetchGroupFriendData(MAIN_MENU_NUM: any, shareTicket: any) {//获取群内排行榜
        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            success: (userRes: any) => {
                let userData = userRes.data[0];
                wx.getGroupCloudStorage({
                    shareTicket: shareTicket,
                    keyList: ["rank" + MAIN_MENU_NUM],
                    success: (resData: any) => {
                        let data: any = resData.data;
                        data.sort((a: any, b: any) => {
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
                        this.crateScroll(data);
                        cc.log("群排行榜数据", resData, data, shareTicket);
                        // ComponentContext.rankList.changeUI(data);
                    },
                    fail: () => {
                        cc.log("分享失败");
                    }
                })
            }
        })
    }

    private crateScroll(data: any) {
        this.curIndex = 1;
        this.curRankData = data;
        this.rankingScrollView.content.removeAllChildren(true);
        let dataLength = data.length;
        let size = dataLength >= this.indexNum ? this.indexNum : dataLength;
        for (let i = 0; i < size; i++) {
            let item = cc.instantiate(this.rankItem); //生成node节点
            let itemCom: RankItem = item.getComponent(item.name);
            itemCom.updateView(i, data[i]);
            item.parent = this.rankingScrollView.content;
        }
    }

    private removeChild() {
    }

    private upIndex() {
        if (this.curIndex > 1) {
            this.curIndex -= 1;
            this.rankingScrollView.content.removeAllChildren(true);
            for (let i = (this.curIndex - 1) * this.indexNum; i < this.curRankData.length; i++) {
                let item = cc.instantiate(this.rankItem); //生成node节点
                let itemCom: RankItem = item.getComponent(item.name);
                itemCom.updateView(i, this.curRankData[i]);
                item.parent = this.rankingScrollView.content;
            }
        }
    }

    private downIndex() {
        if (this.curIndex < Math.ceil(this.curRankData.length / this.indexNum)) {
            this.curIndex += 1;
            this.rankingScrollView.content.removeAllChildren(true);
            for (let i = (this.curIndex - 1) * this.indexNum; i < this.curRankData.length; i++) {
                let item = cc.instantiate(this.rankItem); //生成node节点
                let itemCom: RankItem = item.getComponent(item.name);
                itemCom.updateView(i, this.curRankData[i]);
                item.parent = this.rankingScrollView.content;
            }
        }
    }
}