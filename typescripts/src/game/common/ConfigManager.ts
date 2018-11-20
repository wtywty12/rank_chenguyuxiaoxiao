import {StringUtils} from "../../core/utils/StringUtils";

/**
 * @author: liubowen
 * @date: 2018/9/19 下午3:57
 * @description:
 */
class ConfigManagerClass {

    private constructor() {
    }

    private static _instance: ConfigManagerClass;

    public static get instance(): ConfigManagerClass {
        if (this._instance == null) {
            this._instance = new ConfigManagerClass();
        }
        return this._instance;
    }


    public load(): Promise<void> {
        return new Promise((fulfill, reject) => {
            cc.loader.loadResDir("jsons", (error, datas, urls) => {
                if (error) {
                    cc.error(error);
                    return;
                }
                for (let i = 0; i < datas.length; i++) {
                    let name = StringUtils.getName(urls[i]);
                    let data = datas[i];
                }
                return fulfill();
            });
        });
    }


}

export const ConfigManager: ConfigManagerClass = ConfigManagerClass.instance;