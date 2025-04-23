import { GameManager } from './Managers/GameManager';
import { GameState } from './GameStates/GameState';
const { ccclass } = cc._decorator;

@ccclass
export default class StickDetected extends cc.Component {

    private isCollision: boolean = false;

    onCollisionEnter(other: cc.Collider) {
            if (other.tag === 1) {
                this.isCollision = true;
            }
    }

    onCollisionStay() {
        this.isCollision = true;
    }

    notCollision() {
        if (this.isCollision === false && GameManager.Instance.gameState === GameState.MOVING || GameManager.Instance.gameState === GameState.TOUCH_ON) {
            GameManager.Instance.gameState = GameState.STICK_MOVING;
        }
    }

    update() {
        this.notCollision();
    }
}