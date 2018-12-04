/**
 * 上中下三个排行榜
 */
import propert = cc._decorator.property;
import ccclass = cc._decorator.ccclass;
import { ImageHelper } from "./ImageHelper";
import { Tools } from "./Tools";

@ccclass()
export class Rank2B extends cc.Component {
    @propert(cc.Node)
    private rank_1: cc.Node = null;

    @propert(cc.Node)
    private rank_2: cc.Node = null;

    @propert(cc.Node)
    private rank_3: cc.Node = null;

    @propert(cc.Sprite)
    private head_1: cc.Sprite = null;

    @propert(cc.Sprite)
    private head_2: cc.Sprite = null;

    @propert(cc.Sprite)
    private head_3: cc.Sprite = null;

    @propert(cc.Label)
    private score_1: cc.Label = null;

    @propert(cc.Label)
    private score_2: cc.Label = null;

    @propert(cc.Label)
    private score_3: cc.Label = null;

    private ranks: Array<cc.Node> = [];
    private heads: Array<cc.Sprite> = [];
    private scores: Array<cc.Label> = [];
    private old_datas: Array<any> = [];
    private datas: Array<any> = [];
    private pmIndex: number = -1;
    private old_pmIndex: number = -1;
    private mySore: number = -1;
    private upScore: number = -1;
    private downScore: number = -1;
    private isUpMove: boolean = null;
    private playerId: string = null;

    private moveTime: number = null;

    public constructor() {
        super();
    }

    public initView(datas: Array<any>, playerId: string) {
        this.moveTime = 0.5;
        this.ranks = [this.rank_1, this.rank_2, this.rank_3];
        this.heads = [this.head_1, this.head_2, this.head_3];
        this.scores = [this.score_1, this.score_2, this.score_3];
        this.old_datas = datas;
        this.playerId = playerId;
        this.updateItemInfo(1);
    }

    public updateView(datas: Array<any>, playerId: string) {
        this.datas = datas;
        this.playerId = playerId;
        this.updateItemInfo(2);
        // this.analyData(playerId);
    }

    /**
     * 分析数据
     * 只有一个 两个好友
     * 三个好友
     */
    private analyData(playerId: string) {
        console.log(this.datas)
        console.log(this.old_datas)
        /** 取前三数据 看是否有自己 */
        for (var i=0; i<this.datas.length; i++) {
            var data = this.datas[i];
            if (+playerId == data.get("playerId")) {
                this.pmIndex = i;
                break;
            }
        }
        /** 前三有自己 比对是否和原来相同 */
        console.log("this.pmIndex = " + this.pmIndex)
        if (this.pmIndex != -1) {
            for (var i=0; i<3; i++) {
                var data = this.old_datas[i];
                if (+playerId == data.get("playerId")) {
                    this.old_pmIndex = i;
                    break;
                }
            }
            console.log("old_pmIndex = " + this.old_pmIndex)
            if (this.pmIndex < this.old_pmIndex) {
                /** 排名上升 判定是否大于上一名 */
                console.log("i = " + i)
                if (i != 0) {
                    this.upScore = this.datas[i-1].get("score");
                    this.mySore = data.get("score");
                    if (this.mySore < this.upScore) {
                        this.isUpMove = true;
                        this.playEffect();
                    }
                }
            } else if (this.pmIndex > this.old_pmIndex) {
                /** 排名下降 判定是否小于下一名 */
                console.log("di = " + i)
                if (i != 2) {
                    this.downScore = this.datas[i+1].get("score");
                    this.mySore = data.get("score");
                    if (this.mySore > this.downScore) {
                        this.isUpMove = false;
                        this.playEffect();
                    }
                }
            }
        }
    }

    private playEffect() {
        /** 排名不等 相关动画 */
        var cb1 = cc.callFunc(this.playEffect1, this);
        var dt = cc.delayTime(this.moveTime);
        var uf = cc.callFunc(this.updateItemInfo, this);
        var cb2 = cc.callFunc(this.playEffect2, this);
        this.node.runAction(cc.sequence(cb1, dt, uf, cb2));
    }

    private playEffect1() {
        for (var i=0; i<3; i++) {
            var rank = this.ranks[i];
            var width = rank.width;
            var moveBy = cc.moveBy(this.moveTime, cc.v2(width, 0));
            console.log("isUpMove = " + this.isUpMove)
            if (this.isUpMove) {
                if (i == this.pmIndex) {
                    /** 向上移动 */
                    var upRank = this.ranks[this.pmIndex - 1];
                    var x = rank.x;
                    var y = rank.y;
                    var upMoveTo = cc.moveTo(this.moveTime, cc.v2(x, y));
                    upRank.runAction(cc.spawn(moveBy,upMoveTo));
                    var ux = upRank.x;
                    var uy = upRank.y;
                    var moveTo = cc.moveTo(this.moveTime, cc.v2(ux, uy));
                    rank.runAction(cc.spawn(moveBy,moveTo));
                }
            } else {
                if (i == this.pmIndex) {
                    /** 向下移动 */
                    var downRank = this.ranks[this.pmIndex - 1];
                    var x = rank.x;
                    var y = rank.y;
                    var upMoveTo = cc.moveTo(this.moveTime, cc.v2(x, y));
                    downRank.runAction(cc.spawn(moveBy,upMoveTo));
                    var dx = downRank.x;
                    var dy = downRank.y;
                    var moveTo = cc.moveTo(this.moveTime, cc.v2(dx, dy));
                    rank.runAction(cc.spawn(moveBy,moveTo));
                }
            }
        }
    }

    private updateItemInfo(type: number) {
        var datas = null;
        if (type == 1) {
            datas = this.old_datas;
        } else {
            datas = this.datas;
        }
        var length = datas.length;
        var max = length < 3 && length || 3;

        /** 找到自己位置 */
        for (var i=0; i<datas.length; i++) {
            var value = datas[i];
            if (value.get("playerId") == +this.playerId) {
                this.pmIndex = i;
                break;
            }
        }
        console.log(datas);
        console.log("pd = " + this.pmIndex);
        for (var i=0; i<3; i++) {
            var head = this.heads[i];
            var score = this.scores[i];
            if (this.pmIndex == 0 && i == 0) {
                /** 如果是第一 下面不显示 */
                this.rank_1.active = true;
                var data = datas[0];
                ImageHelper.loadImage(data.get("avatarUrl"), head);
                score.string = Number(data.get("score")).toString();
                this.rank_2.active = false;
                this.rank_3.active = false;
                return;
            } 
            var data = datas[i + this.pmIndex - 1];
            if (typeof data == "undefined") {
                console.log("xi = " + i)
                this.ranks[i].active = false;
                break;
            }
            this.ranks[i].active = true;
            ImageHelper.loadImage(data.get("avatarUrl"), head);
            score.string = Number(data.get("score")).toString();
        }
    }

    private playEffect2() {
        for (var i=0; i<3; i++) {
            var rank = this.ranks[i];
            var width = rank.width;
            var moveBy = cc.moveBy(this.moveTime, cc.v2(-width, 0));
            rank.runAction(moveBy);
        }
    }

}