import { GameManager } from '../Managers/GameManager';
import { GameState } from '../GameStates/GameState';
const { ccclass, property } = cc._decorator;

@ccclass
export class Score extends cc.Component {

    @property({ type: cc.Label })
    public scoreLabel: cc.Label = null;

    private currentScore: number = 0;

    onLoad() {
        GameManager.Instance.node.on('game-state-changed', this.onGameStateChanged, this);
    }

    start() {
        this.updateScoreLabel();
    }

    onGameStateChanged(newState: GameState) {
        if (newState === GameState.LOAD) {
            this.currentScore = 0;
            this.updateScoreLabel();
        }
    }

    public addScore(amount: number) {
        this.currentScore += amount;
        this.updateScoreLabel();
    }

    private updateScoreLabel() {
        if (this.scoreLabel) {
            this.scoreLabel.string = this.currentScore.toString();
        }
    }

    onDestroy() {
        GameManager.Instance.node.on('game-state-changed', this.onGameStateChanged, this);
    }
}