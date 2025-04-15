import { GameManager } from './Managers/GameManager';
import { GameState } from './GameStates/GameState';
const { ccclass, property } = cc._decorator;

@ccclass
export default class StickScale extends cc.Component {

    @property({ type: cc.Node })
    stick: cc.Node = null;

    @property({ type: cc.Float })
    scaleIncrement: number = 0.1;

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }
    
    onTouchStart(event: cc.Event.EventTouch) {
        if (GameManager.Instance.gameState === GameState.NONE) {
            this.schedule(this.scaleY, 0);
        }
    }

    onTouchEnd(event: cc.Event.EventTouch) {
        if (GameManager.Instance.gameState === GameState.NONE) {
            this.stopScaling();
            GameManager.Instance.gameState = GameState.TOUCH_ON;
        }
    }

    scaleY() {
        if (this.stick) {
            this.stick.scaleY += this.scaleIncrement;
        }
    }

    stopScaling() {
        this.unschedule(this.scaleY);
    }

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }
}