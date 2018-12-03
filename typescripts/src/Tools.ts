
export class Tools {
    /**
     * 获取Map长度
     */
    public static getMapLength(map: Map<any, any>): number {
        let length = 0;
        map.forEach(value=>{
            length++;
        })
        return length;
    }
}