import { GameManager } from '../Managers/GameManager';
import { GameState } from '../GameStates/GameState';
const { ccclass, property } = cc._decorator;

@ccclass
export default class HeroGameOver extends cc.Component {

    onCollisionEnter(other: cc.Collider) {
        if (other.tag === 2) {
            if (GameManager.Instance.gameState === GameState.FALL) {
                GameManager.Instance.gameState = GameState.GAME_OVER;
            }
        }
    }
}