import {ResourcesManager} from "../../core/common/ResourcesManager";
import {ConfigManager} from "../common/ConfigManager";
import {GameScene} from "../../core/component/GameScene";
import ccclass = cc._decorator.ccclass;
import {GameEngine} from "../common/GameEngine";

/**
 * @author: liubowen
 * @date: 2018/9/18 下午11:33
 * @description:
 */
@ccclass()
export class LoadingScene extends GameScene {

    protected async load() {
        await ConfigManager.load();
        await ResourcesManager.load();
        await this.loadFinish();
    }

    protected unload(): void {
    }

    private loadFinish(): void {
        GameEngine.audio.playBGM("bg");

        GameEngine.loginService.checkLogin();
    }


}