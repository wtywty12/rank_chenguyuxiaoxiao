import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import {RankItem} from "./RankItem";
import {ResourcesManager} from "./ResourcesManager";


@ccclass
export class RankListClass {
    /** prefab */
    private rankNode: cc.Node = null;
    /** list */
    private rankList: cc.Layout = null;
    /** 记录好友排行数据 */
    private friendRankData: Array<any> = [];

    public constructor () {

    }

    private static _instance: RankListClass;

    public static get instance(): RankListClass {
        if (this._instance == null) {
            this._instance = new RankListClass();
        }
        return this._instance;
    }

    /**
     * 设置好友群数据
     */
    public setFriendRankData(data: Array<Map<string, any>>, layout: cc.Layout, rankNode: cc.Node) {
        this.rankList = layout;
        this.rankNode = rankNode;
        data.forEach((value, key) => {
            this.pushRankItem(value, key+1);
            this.pushRankItem(value, key+1);
            this.pushRankItem(value, key+1);
        })
    }

    /**
     * 添加一个排行榜数据
     */
    private pushRankItem(data: Map<string, any>, index: number) {
        var node = cc.instantiate(this.rankNode);
        node.setPosition(0, 0);
        let rankItem: RankItem = node.getComponent("RankItem");
        rankItem.setPaiMing(index.toString());
        rankItem.setNickName(data.get("nickname"));
        rankItem.setScore(data.get("score"));
        rankItem.setWinGame(data.get("level"));
        rankItem.setImgHead(data.get("avatarUrl"));
        node.active = true;
        this.rankList.node.addChild(node);
    }
    
}


export const RankList: RankListClass = RankListClass.instance;