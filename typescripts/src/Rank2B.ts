/**
 * 上中下三个排行榜
 */
import propert = cc._decorator.property;
import ccclass = cc._decorator.ccclass;
import { ImageHelper } from "./ImageHelper";

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
    private datas: Array<any> = [];

    private moveTime: number = null;

    public constructor() {
        super();
    }

    public initView(datas: Array<any>) {
        this.moveTime = 0.5;
        this.ranks = [this.rank_1, this.rank_2, this.rank_3];
        this.heads = [this.head_1, this.head_2, this.head_3];
        this.scores = [this.score_1, this.score_2, this.score_3];
        this.updateView(datas);
    }

    public updateView(datas: Array<any>) {
        this.datas = datas;
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
            rank.runAction(moveBy);
        }
    }

    private updateItemInfo() {
        for (var i=0; i<3; i++) {
            var head = this.heads[i];
            var score = this.scores[i];
            var data = this.datas[i];
            ImageHelper.loadImage(data.get("avatarUrl"), head);
            score.string = Number(data.get("score")).toString() ;
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