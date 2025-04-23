import { GameManager } from '../Managers/GameManager';
import { GameState } from '../GameStates/GameState';
const { ccclass } = cc._decorator;

@ccclass
export default class CameraShake extends cc.Component {

    private duration: number = 0.5;
    private shaking: number = 25;
    private repeat: number = 5;
    private currentPos: cc.Vec3;

    onLoad() {
        GameManager.Instance.node.on('game-state-changed', this.onGameStateChanged, this);
        this.currentPos = this.node.position;
    }

    private onGameStateChanged(newState: GameState) {
        if (newState === GameState.GAME_OVER) {
            this.shake();
        }
    }

    private shake() {
        this.currentPos = this.node.position;
        cc.tween(this.node)
            .repeat(this.repeat,
                cc.tween()
                    .to(this.duration / 10, { position: this.randomPosition() })
                    .to(this.duration / 10, { position: this.currentPos })
            )
            .call(() => {
                this.node.position = this.currentPos;
            })
            .start();
    }

    private randomPosition() {
        const randomXPos = this.currentPos.x + this.shaking;
        const randomYPos = this.currentPos.y + this.shaking;
        return cc.v3(randomXPos, randomYPos, this.currentPos.z);
    }

    onDestroy() {
        GameManager.Instance.node.off('game-state-changed', this.onGameStateChanged, this);
    }
}