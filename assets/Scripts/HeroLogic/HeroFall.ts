import { GameManager } from '../Managers/GameManager';
import { GameState } from '../GameStates/GameState';
const { ccclass, property } = cc._decorator;

@ccclass
export default class HeroFall extends cc.Component {

    @property({ type: cc.Node })
    hero: cc.RigidBody = null;

    onLoad() {
        this.hero = this.getComponent(cc.RigidBody);
        GameManager.Instance.node.on('game-state-changed', this.onGameStateChanged, this);
    }

    private onGameStateChanged(newState: GameState) {
        if (newState === GameState.FALL) {
            this.hero.linearVelocity = cc.v2(0, -333);
        }
    }

    onDestroy() {
        GameManager.Instance.node.off('game-state-changed', this.onGameStateChanged, this);
    }
}