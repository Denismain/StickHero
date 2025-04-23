import { GameManager } from '../Managers/GameManager';
import { GameState } from '../GameStates/GameState';
const { ccclass } = cc._decorator;

@ccclass
export default class PlayButton extends cc.Component {

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    onTouchEnd() {
        if (GameManager.Instance.gameState !== GameState.NONE) {
            GameManager.Instance.gameState = GameState.NONE;
            this.node.active = false;
        }
    }

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }
}