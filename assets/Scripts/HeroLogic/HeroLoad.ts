import { GameManager } from '../Managers/GameManager';
import { GameState } from '../GameStates/GameState';
const { ccclass } = cc._decorator;

@ccclass
export default class HeroLoad extends cc.Component {

    private hero: cc.RigidBody = null;
    private currentPosition: cc.Vec3 = null;

    onLoad() {
        this.hero = this.getComponent(cc.RigidBody);
        GameManager.Instance.node.on('game-state-changed', this.onGameStateChanged, this);
        this.currentPosition = this.hero.node.position;
    }

    private onGameStateChanged(newState: GameState) {
        if (newState === GameState.LOAD) {
            this.hero.linearVelocity = cc.v2(0, 0);
            this.hero.node.position = cc.v3(this.currentPosition.x, this.currentPosition.y, this.currentPosition.z);
            setTimeout(() => {
                GameManager.Instance.gameState = GameState.NONE;
            }, 0);  // переход состояния в следующем кадре
        }
    }

    onDestroy() {
        GameManager.Instance.node.off('game-state-changed', this.onGameStateChanged, this);
    }

}