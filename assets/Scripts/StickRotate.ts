import { GameManager } from './Managers/GameManager';
import { GameState } from './GameStates/GameState';
const { ccclass, property } = cc._decorator;

@ccclass
export default class StickRotate extends cc.Component {

    @property({ type: cc.Float })
    tweenDuration: number = 0.3;

    onLoad() {
        GameManager.Instance.node.on('game-state-changed', this.onGameStateChanged, this);
    }

    private onGameStateChanged(newState: GameState) {
        if (newState === GameState.TOUCH_ON) {
            this.stickRotate();
            GameManager.Instance.gameState = GameState.MOVING;
        }
    }

    private stickRotate() {
        cc.tween(this.node)
            .to(this.tweenDuration, { angle: -90 }, {
                easing: "circIn",
            })
            .start();
    }

    onDestroy() {
        GameManager.Instance.node.off('game-state-changed', this.onGameStateChanged, this);
    }
}
