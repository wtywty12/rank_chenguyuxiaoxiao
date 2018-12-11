import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import {Item2A} from "./Item2A";

@ccclass
export class ScrollView2A extends cc.Component {

    @property(cc.Node)
    private view: cc.Node = null;

    @property(cc.Node)
    private list: cc.Node = null;

    @property(cc.Prefab)
    private itemPrefab: cc.Prefab = null;

    private spacingY: number = null;
    private data: Array<any> = null;
    private rowItemCounts: number = null;
    private items: Array<any> = null;
    private topMax: number = null;
    private bottomMax: number = null;
    private lastListY: number = null;
    private itemHeight: number = null;

    private itemMap: Map<any, any> = new Map<any, any>();

    protected constructor() {
        super();
    }
 
    onLoad () {
        this.resetData();
    }

    private resetData() {
        //预加载的item的数据
        this.data = []
        //当前可视区域内部填充满需要的item数量
        this.rowItemCounts = 0 
        //创建的item节点的数组
        this.items = []
        //顶部最大Y
        this.topMax = 0
        //底部最小Y
        this.bottomMax = 0
        //上一次listnode的Y坐标
        this.lastListY = 0
        //itemprefab的高度
        this.itemHeight = 0
        //空间距
        this.spacingY = 0
    }

    public init(data: any) {
        this.data = data 
        //保存高度
        let height = 0
        //创建item 
        let item = cc.instantiate(this.itemPrefab)
        height = item.height
        this.itemHeight = height
        //计算可视区域内部填充满需要的item数量
        this.rowItemCounts = Math.ceil(this.view.height / (height + this.spacingY))
        //加载rowitemCounts + 10个item 
        for(let i = 0 ; i < 15; ++ i){
            if(data[i] == undefined)
                break;
            let rankItem: Item2A = item.getComponent('Item2A')
            console.log("更新排行榜item")
            console.log(data[i]);
            rankItem.updateItem(data[i], i);
            //记录一下itemid
            this.itemMap.set(item, i);
            //保存item到数组
            this.items.push(item)
            //加入item节点到scrollview的list里面
            this.list.addChild(item)
            //设置x坐标
            item.x = 0
            //设置y坐标
            item.y = - (i * (height + this.spacingY ))
            //继续创建
            if(i < 14){
                item = cc.instantiate(this.itemPrefab)
            }
        }
        //设置list的高度 不设置无法滑动
        this.list.height = (this.items.length) * height + (this.items.length) * this.spacingY
        //计算顶部最大Y
        this.topMax = (5 * height + 4 * this.spacingY)
        //计算底部最小Y
        this.bottomMax = -(this.view.height + this.topMax)
        //保存list的当前Y坐标
        this.lastListY = this.list.y
    }

    // update(){
    //     //判断是否往下滑动
    //     let isDown = this.list.y > this.lastListY
    //     //当前的item数量
    //     let countOfItems = this.items.length
    //     //预显示数据的总数量
    //     let dataLen = this.data.length
    //     //遍历所有item节点
    //     for (let i in this.items){
    //         let item = this.items[i]
    //         if (item == null) {
    //             // return;
    //         }
    //         let index = +i;
    //         //item坐标转换到对应view节点的坐标 y坐标需要减去一半item的高度...具体看你item的锚点设置
    //         let itemPos = this.list.convertToWorldSpace(item.position)
    //         itemPos.y -= this.view.height / 2
    //         itemPos = this.view.convertToWorldSpace(itemPos)
    //         //如果是往下滑动
    //         if(isDown){
    //             //判断当前item的坐标是否大于顶部最大Y
    //             if(itemPos.y > this.topMax){
    //             // if(this.itemMap.get(item)>=10)
    //                 //计算新的itmeid 
    //                 let newId = this.itemMap.get(item) + countOfItems
    //                 if (newId == NaN) {
    //                     // return;
    //                 }
    //                 //如果item已经显示完毕了就不需要刷新了
    //                 if(newId >= dataLen) return 
    //                 let newitem = cc.instantiate(this.itemPrefab);
    //                 //设置x坐标
    //                 newitem.x = 0
    //                 //设置y坐标 
    //                 newitem.y = - (this.itemHeight / 2 + newId * (this.itemHeight + this.spacingY ))
    //                 this.items.splice(index, index+1);
    //                 item.removeFromParent(true);
    //                 this.items.push(newitem);
    //                 console.log("itemPos.y = " + itemPos.y + " topMax = " + this.topMax);
    //                 this.list.addChild(newitem);
                    

    //                 //保存itemid
    //                 this.itemMap.delete(item);
    //                 this.itemMap.set(newitem, newId);
    //                 //计算item的新的Y坐标 也就是当前y减去所有item加起来的高度
    //                 // item.y = item.y - countOfItems * this.itemHeight - (countOfItems ) * this.spacingY
    //                 // item.y = -(this.itemHeight/2 + (Number(i) + countOfItems)*(this.itemHeight+this.spacingY))
    //                 //modify by wty


    //                 //刷新item内容 
    //                 let rankItem: RankItem = newitem.getComponent('RankItem')
                    
    //                 console.log("up newId = " + newId)
    //                 rankItem.updateItem(this.data[newId], newId);
    //             }
    //             //如果是往上滑动
    //         }else { 
    //             // //如果超过底部最小Y 和上面的一样处理一下就完事了
    //             // if(itemPos.y < this.bottomMax){
    //             //     let newId = this.itemMap.get(item) - countOfItems
    //             //     if (newId < 0) return
    //             //     this.itemMap.delete(item);
    //             //     this.itemMap.set(item, newId);
    //             //     item.y = item.y + countOfItems * this.itemHeight + (countOfItems) * this.spacingY
    //             //     let index = this.itemMap.get(item);
    //             //     let rankItem: RankItem = item.getComponent('RankItem')
    //             //     console.log("itemPos.y = " + itemPos.y + " bottomMax = " + this.bottomMax);
    //             //     console.log("down newId = " + newId)
    //             //     rankItem.updateItem(this.data[newId], newId);
    //             // }
    //         }
    //     }
    //     //存储下当前listnode的Y坐标 
    //     this.lastListY = this.list.y
    // }

    public clearAllData() {
        this.itemMap.clear();
        this.list.removeAllChildren();
        this.resetData();
    }
}

