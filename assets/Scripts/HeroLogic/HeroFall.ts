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
            this.hero.gravityScale = 1;
        } else if (newState === GameState.LOAD) {
            this.hero.gravityScale = 0;
        }
    }

    onDestroy() {
        GameManager.Instance.node.off('game-state-changed', this.onGameStateChanged, this);
    }
}