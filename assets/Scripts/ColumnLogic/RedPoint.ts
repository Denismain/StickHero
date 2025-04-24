import { GameManager } from '../Managers/GameManager';
import { Score } from '../Score/Score';
const { ccclass } = cc._decorator;

@ccclass
export default class RedPoint extends cc.Component {

    private redValue: number = 1;

    onCollisionEnter(other: cc.Collider) {
        if (other.tag === 5) {
            console.log("Add score");
            const scoreManager = GameManager.Instance.node.getComponent(Score);
            if (scoreManager) {
                scoreManager.addScore(this.redValue);
                cc.director.emit('red-point');
            }
        }
    }
}