import { GameState } from '../GameStates/GameState';
import { GameManager } from './GameManager';
const { ccclass, property } = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {

    @property({ type: cc.Node })
    StartUI: cc.Node = null;

    @property({ type: cc.Node })
    GameOverUI: cc.Node = null;

    @property({ type: cc.Node })
    ScoreUI: cc.Node = null;

    onLoad() {
        GameManager.Instance.node.on('game-state-changed', this.onGameStateChanged, this);
    }

    private onGameStateChanged(newState: GameState) {
        if (newState === GameState.NONE) {
            this.StartUI.active = false;
            this.ScoreUI.active = true;
        }
        if (newState === GameState.GAME_OVER) {
            this.GameOverUI.active = true;
        } else { this.GameOverUI.active = false; }
    }

    onDestroy() {
        GameManager.Instance.node.off('game-state-changed', this.onGameStateChanged, this);
    }
}