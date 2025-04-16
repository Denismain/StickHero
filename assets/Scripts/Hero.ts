import { GameManager } from './Managers/GameManager';
import { GameState } from './GameStates/GameState';
const { ccclass, property } = cc._decorator;

@ccclass
export default class Hero extends cc.Component {

    @property({ type: cc.Float })
    speedX: number = 100;

    private hero: cc.RigidBody = null; 

    onLoad() {
        this.hero = this.getComponent(cc.RigidBody);
        GameManager.Instance.node.on('game-state-changed', this.onGameStateChanged, this);
    }

    private onGameStateChanged(newState: GameState) {
        if (newState === GameState.MOVING) {
            this.startMoving();
        }
    }

    startMoving() {
        this.hero.linearVelocity = cc.v2(this.speedX, 0);
    }

    onDestroy() {
        GameManager.Instance.node.off('game-state-changed', this.onGameStateChanged, this);
    }

}
