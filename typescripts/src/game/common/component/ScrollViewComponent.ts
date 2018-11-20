import {GameScrollView} from "../../../core/component/GameScrollView";

const {ccclass, property} = cc._decorator;

/**
 * @author: lizhen
 * @date: 2018/10/3 下午9:43
 * @description:
 */

@ccclass
export abstract class ScrollViewComponent<T> extends GameScrollView {

    @property(cc.Prefab)
    private cellItemPrefab: cc.Prefab = null;
    @property(cc.ScrollView)
    private scrollView: cc.ScrollView = null;
    @property({tooltip: "是否是垂直滚动"} || cc.Boolean)
    private _horizontal: boolean = false;
    @property({tooltip: "是否是水平滚动"} || cc.Boolean)
    private _vertical: boolean = false;
    @property(cc.Float)
    private spacing: number = 10;
    /** 存放 cell 的列表 */
    private cellItemList: Array<cc.Node> = new Array<cc.Node>();
    /** 存放数据的列表 */
    private cellDataList: Array<T> = new Array<T>();
    /** 滑动之前的 content 的位置 */
    private lastContentPosition: cc.Vec2 = cc.v2(0, 0);
    private isUpdateFrame: boolean = true;
    protected cellItemTempSize: cc.Size = null;


    protected onLoad(): void {
        super.onLoad();
        this.scrollView.content.on("position-changed", this.updateContentView.bind(this));
    }

    /** 创建cell List列表 */
    private createCellList() {
        if (this.vertical) {
            this.createVerticalCellList();
        } else if (this.horizontal) {
            this.createHorizontalCellList();
        }
    }

    private updateCell(index: number): void {
        let logicComponent = this.cellItemList[index].getComponent(this.cellItemPrefab.name);
        if (logicComponent && logicComponent.updateView) {
            logicComponent.updateView(index, this.cellDataList[index]);
        }
    }

    private createVerticalCellList() {
        let count = 10;
        for (let i = 0; i < this.cellDataList.length; i++) {
            if (i > count - 1) {
                return;
            }
            let node: cc.Node = cc.instantiate(this.cellItemPrefab);
            cc.log("node  :", node);
            if (i == 0) {
                this.cellItemTempSize = node.getContentSize();
                count = Math.ceil(this.node.height / node.height) * 2;
                let height = this.cellDataList.length * (this.cellItemTempSize.height + this.spacing);
                this.scrollView.content.setContentSize(cc.size(this.scrollView.content.width, height));
            }
            // @ts-ignore
            node["cellID"] = i;

            this.scrollView.content.addChild(node);
            this.cellItemList.push(node);
            let logicComponent = this.cellItemList[i].getComponent(this.cellItemPrefab.name);
            if (logicComponent && logicComponent.updateView) {
                logicComponent.updateView(i, this.cellDataList[i]);
            }

            node.y = -i * (this.cellItemTempSize.height + this.spacing);
        }
    }

    private createHorizontalCellList() {
        let count = 10;
        for (let i = 0; i < this.cellDataList.length; i++) {
            if (i > count - 1) {
                return;
            }
            let node: any = cc.instantiate(this.cellItemPrefab);
            cc.log("node  :", node);
            if (i == 0) {
                this.cellItemTempSize = node.getContentSize();
                count = Math.ceil(this.node.width / node.width) * 2;
                let width = this.cellDataList.length * (this.cellItemTempSize.width + this.spacing);
                this.scrollView.content.setContentSize(cc.size(width, this.scrollView.content.height));
            }

            // @ts-ignore
            node["cellID"] = i;

            this.scrollView.content.addChild(node);
            this.cellItemList.push(node);

            let logicComponent = this.cellItemList[i].getComponent(this.cellItemPrefab.name);
            if (logicComponent && logicComponent.updateView) {
                logicComponent.updateView(i, this.cellDataList[i]);
            }
            node.x = (this.cellItemTempSize.width + this.spacing) * i;
        }
    }

    private getPositionInView(item: cc.Node) {
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    }

    private updateContentView() {
        cc.log("updateContentView   :");
        if (this.cellDataList == null || this.cellDataList.length == 0) {
            cc.log("updateCellList cellDataList is null, cellDataList: ", this.cellDataList);
            return;
        }
        if (this.vertical) {
            if (this.isUpdateFrame) {
                this.isUpdateFrame = false;
                this.scheduleOnce(this.updateVerticalContentView.bind(this), 0);
            }

        } else {
            if (this.isUpdateFrame) {
                this.isUpdateFrame = false;
                this.scheduleOnce(this.updateHorizontalContentView.bind(this), 0);
            }

        }

    }

    private updateVerticalContentView() {

        let isDown = this.scrollView.content.y < this.lastContentPosition.y;


        let offsetY = (this.cellItemTempSize.height + this.spacing) * this.cellItemList.length;
        let offset = offsetY / 4;
        let newY = 0;

        for (let i = 0; i < this.cellItemList.length; i++) {
            let viewPos = this.getPositionInView(this.cellItemList[i]);
            if (isDown) {
                newY = this.cellItemList[i].y + offsetY;
                if (viewPos.y < -(offset * 3) && newY <= 0) {
                    this.cellItemList[i].y = newY;
                    // @ts-ignore
                    let idx = this.cellItemList[i]["cellID"] - this.cellItemList.length;
                    let logicComponent = this.cellItemList[i].getComponent(this.cellItemPrefab.name);
                    if (logicComponent && logicComponent.updateView) {
                        logicComponent.updateView(idx, this.cellDataList[idx]);
                    }
                    // @ts-ignore
                    this.cellItemList[i]["cellID"] = idx;
                }
            } else {
                newY = this.cellItemList[i].y - offsetY;
                if (viewPos.y > offset && newY > -this.scrollView.content.height) {

                    this.cellItemList[i].y = newY;
                    // @ts-ignore
                    let idx = this.cellItemList[i]["cellID"] + this.cellItemList.length;
                    let logicComponent = this.cellItemList[i].getComponent(this.cellItemPrefab.name);
                    if (logicComponent && logicComponent.updateView) {
                        logicComponent.updateView(idx, this.cellDataList[idx]);
                    }
                    // @ts-ignore
                    this.cellItemList[i]["cellID"] = idx;
                }
            }
        }

        this.lastContentPosition = this.scrollView.content.position;
        this.isUpdateFrame = true;
    }

    private updateHorizontalContentView() {
        let isLeft = this.scrollView.content.x < this.lastContentPosition.x;


        let offsetX = (this.cellItemTempSize.width + this.spacing) * this.cellItemList.length;
        let offset = offsetX / 4;
        let newX = 0;

        for (let i = 0; i < this.cellItemList.length; i++) {
            let viewPos = this.getPositionInView(this.cellItemList[i]);
            if (isLeft) {
                newX = this.cellItemList[i].x + offsetX;
                if (viewPos.x < -offset && newX < this.scrollView.content.width) {
                    this.cellItemList[i].x = newX;
                    // @ts-ignore
                    let idx = this.cellItemList[i]["cellID"] + this.cellItemList.length;
                    let logicComponent = this.cellItemList[i].getComponent(this.cellItemPrefab.name);
                    if (logicComponent && logicComponent.updateView) {
                        logicComponent.updateView(idx, this.cellDataList[idx]);
                    }
                    // @ts-ignore
                    this.cellItemList[i]["cellID"] = idx;
                }
            } else {
                newX = this.cellItemList[i].x - offsetX;
                if (viewPos.x > offset * 3 && newX >= 0) {

                    this.cellItemList[i].x = newX;
                    // @ts-ignore
                    let idx = this.cellItemList[i]["cellID"] - this.cellItemList.length;
                    let logicComponent = this.cellItemList[i].getComponent(this.cellItemPrefab.name);
                    if (logicComponent && logicComponent.updateView) {
                        logicComponent.updateView(idx, this.cellDataList[idx]);
                    }
                    // @ts-ignore
                    this.cellItemList[i]["cellID"] = idx;
                }
            }
        }

        this.lastContentPosition = this.scrollView.content.position;
        this.isUpdateFrame = true;
    }

    /** 初始化cellData的数据 */
    private initCellDataList(cellDataList: Array<T>) {
        this.clearItems();
        this.cellDataList = cellDataList;
        this.createCellList();
    }

    public updateCellList(cellDataList: Array<T>): void {
        if (cellDataList == null || cellDataList.length == 0) {
            cc.log("updateCellList cellDataList is null, cellDataList: ", cellDataList);
            return;
        }
        this.sort(cellDataList);
        if (this.cellDataList == null || this.cellDataList.length == 0 || cellDataList.length !=
            this.cellDataList.length) {
            this.initCellDataList(cellDataList);
            return;
        }
        for (let i = 0; i < cellDataList.length; i++) {
            let newData = cellDataList[i];
            this.cellDataList[i] = newData;
            this.updateCell(i);
        }
    }

    private clearItems(): void {
        if (this.cellItemList == null || this.cellItemList.length == 0) {
            return;
        }
        this.cellItemList.forEach(value => {
            value.removeFromParent(true);
        });
        this.cellItemList = new Array<cc.Node>();
    }

    protected abstract sort(cellDataList: Array<T>): void;
}