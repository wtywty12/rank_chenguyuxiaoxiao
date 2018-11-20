/**
 * @author: liubowen
 * @date: 2018/10/11 下午3:24
 * @description:
 */
import {RankList} from "../RankList";

class ComponentContextClass {
    set rankList(value: RankList) {
        this._rankList = value;
    }
    get rankList(): RankList {
        return this._rankList;
    }

    private constructor() {
    }

    private static _instance: ComponentContextClass;

    public static get instance(): ComponentContextClass {
        if (this._instance == null) {
            this._instance = new ComponentContextClass();
        }
        return this._instance;
    }

    private _rankList: RankList;


}

export const ComponentContext: ComponentContextClass = ComponentContextClass.instance;