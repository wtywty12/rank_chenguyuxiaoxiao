/**
 * User: lizhen
 * Note: RankList
 */
import {ScrollViewComponent} from "./common/component/ScrollViewComponent";
import {ComponentContext} from "./common/ComponentContext";

const {ccclass, property} = cc._decorator;

@ccclass
export class RankList extends ScrollViewComponent<any> {

    protected load(): void {
        ComponentContext.rankList = this;
    }

    protected unload(): void {
    }

    protected sort(cellDataList: Array<any>): void {
    }

    public changeUI(heroes: Array<any>) {
        this.updateCellList(heroes);
    }

}