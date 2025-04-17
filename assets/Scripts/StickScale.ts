import { GameManager } from './Managers/GameManager';
import { GameState } from './GameStates/GameState';
const { ccclass, property } = cc._decorator;

@ccclass
export default class StickScale extends cc.Component {

    @property({ type: cc.Float })
    scaleIncrement: number = 1;

    private stick: cc.Node = null;
    private sprite: cc.Sprite = null;

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        cc.director.getScene().on('stick-created', this.onStickCreated, this);
    }

    private onStickCreated(stickNode: cc.Node) {
        this.stick = stickNode;
        this.sprite = this.stick.getComponentInChildren(cc.Sprite);
    }

    onTouchStart() {
        if (GameManager.Instance.gameState === GameState.NONE) {
            this.sprite.node.active = true;
            this.schedule(this.scaleY, 0);
        }
    }

    onTouchEnd() {
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
        cc.director.getScene().off('stick-created', this.onStickCreated, this);
    }
}