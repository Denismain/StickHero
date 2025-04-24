import { GameState } from '../GameStates/GameState';
import { GameManager } from '../Managers/GameManager';
const { ccclass } = cc._decorator;

@ccclass
export default class ScorePosition extends cc.Component {

    onLoad() {
        GameManager.Instance.node.on('game-state-changed', this.onGameStateChanged, this);
    }

    private onGameStateChanged(newState: GameState) {
        if (newState === GameState.GAME_OVER) {
            this.node.setPosition(-70, -70);
        } else {
            this.node.setPosition(0, 50);
        }
    }

    onDestroy() {
        GameManager.Instance.node.off('game-state-changed', this.onGameStateChanged, this);
    }
}