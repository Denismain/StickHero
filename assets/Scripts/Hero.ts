import { GameManager } from './Managers/GameManager';
import { GameState } from './GameStates/GameState';
const { ccclass, property } = cc._decorator;

@ccclass
export default class Hero extends cc.Component {

    private rigidBody: cc.RigidBody = null; 

    @property({ type: cc.Float })
    speedX: number = 100;

    onLoad() {
        this.rigidBody = this.getComponent(cc.RigidBody); // Получаем RigidBody
        GameManager.Instance.node.on('game-state-changed', this.onGameStateChanged, this);
    }

    private onGameStateChanged(newState: GameState) {
        if (newState === GameState.MOVING) {
            this.startMoving();
        }
    }

    startMoving() {
        this.rigidBody.linearVelocity = cc.v2(this.speedX, 0);
    }

    onDestroy() {
        GameManager.Instance.node.off('game-state-changed', this.onGameStateChanged, this);
    }

}
