import { GameState } from '../GameStates/GameState';
import { GameManager } from '../Managers/GameManager';
const { ccclass, property } = cc._decorator;

@ccclass
export default class BestScore extends cc.Component {

    @property(cc.Label)
    bestScoreLabel: cc.Label = null;

    private bestScore: number = 0;
    private currentScore: number = 0;

    onLoad() {
        GameManager.Instance.node.on('game-state-changed', this.onGameStateChanged, this);
        cc.director.on('score-changed', this.onScoreChanged, this); 
        this.node.active = false;
    }

    private onGameStateChanged(newState: GameState) {
        if (newState === GameState.GAME_OVER) {
            this.node.active = true;
            this.updateBestScore();
        } else {
            this.node.active = false;
        }
    }

    private onScoreChanged(currentScore: number) {
        this.currentScore = currentScore;
    }

    private updateBestScore() {
        if (this.currentScore > this.bestScore) {
            this.bestScore = this.currentScore;
            this.updateBestScoreLabel();
        }
    }

    private updateBestScoreLabel() {
        if (this.bestScoreLabel) {
            this.bestScoreLabel.string = "Best Score:\n" + this.bestScore.toString();
        }
    }

    onDestroy() {
        GameManager.Instance.node.off('game-state-changed', this.onGameStateChanged, this);
        cc.director.off('score-changed', this.onScoreChanged, this); 
    }
}