const { ccclass, property } = cc._decorator;

@ccclass
export default class Score extends cc.Component {

    @property({ type: cc.Label })
    public scoreLabel: cc.Label = null;

    private currentScore: number = 0;

    start() {
        this.updateScoreLabel();
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
}