/**
 * User: lizhen
 * Note: RankItem
 */
import {BaseCell} from "./common/component/BaseCell";
import {ImageHelper} from "./common/helper/ImageHelper";
import {NumberUtils} from "./common/helper/NumberUtils";

const {ccclass, property} = cc._decorator;

@ccclass
export class RankItem extends BaseCell<any> {

    @property(cc.Label)
    private nameLabel: cc.Label = null;
    @property(cc.Label)
    private scoreLabel: cc.Label = null;
    @property(cc.Label)
    private idLabel: cc.Label = null;
    @property(cc.Sprite)
    private heroSpr: cc.Sprite = null;

    private heroData: any = null;

    public updateView(idx: number, data: any) {
        this.heroData = data;
        this.nameLabel.string = this.heroData.nickname;
        let value = this.heroData.KVDataList[0].value;
        this.scoreLabel.string = NumberUtils.convertNumber(value);
        this.idLabel.string = (idx + 1).toString();
        ImageHelper.loadImage(this.heroData.avatarUrl, this.heroSpr);
    }
}