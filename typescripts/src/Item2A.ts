import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import {ImageHelper} from "./ImageHelper";
import {StringUtils} from "./StringUtils";

@ccclass
export class Item2A extends cc.Component {

    @property(cc.Label)
    private lbl_paiming: cc.Label = null;

    @property(cc.Label)
    private lbl_nickName: cc.Label = null;

    @property(cc.Label)
    private lbl_winGame: cc.Label = null;

    @property(cc.Label)
    private lbl_score: cc.Label = null;

    @property(cc.Sprite)
    private img_head: cc.Sprite = null;

    protected constructor() {
        super();
    }

    protected onLoad() {

    }

    protected onDestroy() {

    }

    public updateItem(data: Map<string, any>, index: number) {
        if (typeof(index) != "number" || data == undefined) {
            return;
        }
        index++;
        this.setPaiMing(index.toString());
        this.setNickName(data.get("nickname"));
        this.setScore(data.get("score"));
        this.setChenghao(data.get("chenghao"));
        this.setImgHead(data.get("avatarUrl"));
        this.node.active = true;
    }

    public setPaiMing(str: string) {
        if (typeof(str) != "string") {
            return;
        }
        this.lbl_paiming.string = str;
    }

    public setNickName(str: string) {
        if (typeof(str) != "string") {
            return;
        }
        this.lbl_nickName.string = str;
    }

    public setChenghao(str: any) {
        if (str == undefined) {
            str = "";
        }
        this.lbl_winGame.string = str;
    }

    public setScore(str: any) {
        if (str == undefined) {
            str = 0;
        }
        this.lbl_score.string = Number(str).toString();
    }

    public setImgHead(url: string) {
        if (typeof(url) != "string") {
            return;
        }
        ImageHelper.loadImage(url, this.img_head);
    }
}