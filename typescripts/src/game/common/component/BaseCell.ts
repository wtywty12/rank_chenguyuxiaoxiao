/**
 * @author: lizhen
 * @date: 2018/10/4 上午11:02
 * @description:
 */
const {ccclass, property} = cc._decorator;

@ccclass
export abstract class BaseCell<T> extends cc.Component {

    protected abstract updateView(idx: number, data: T): void;

}