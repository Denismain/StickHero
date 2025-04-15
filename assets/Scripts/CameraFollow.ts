import { GameManager } from './Managers/GameManager';
import { GameState } from './GameStates/GameState';
const { ccclass, property } = cc._decorator;

@ccclass
export default class CameraFollow extends cc.Component {

    @property({ type: cc.Node })
    hero: cc.Node = null;

    private smooth: number = 0.125;  //Плавность слежения
    private offset: cc.Vec2 = new cc.Vec2(420, 45);
    private isFollowing: boolean = false;  // Флаг слежения

    start () {
        GameManager.Instance.node.on('game-state-changed', this.onGameStateChanged, this);
    }

    private onGameStateChanged(newState: GameState) {
        if (newState === GameState.NONE) {
            this.isFollowing = true;
        } else {
            this.isFollowing = false;
        }
    }

    lateUpdate() {
        if (this.isFollowing) {
            const heroWorldPosition = this.hero.convertToWorldSpaceAR(cc.Vec2.ZERO);
            // Вычисляем желаемую позицию камеры
            const desiredPosition = new cc.Vec2(heroWorldPosition.x + this.offset.x, heroWorldPosition.y + this.offset.y);
            // Сглаживание
            let smoothPosition = new cc.Vec2(this.node.x, this.node.y);
            smoothPosition.x = cc.misc.lerp(this.node.x, desiredPosition.x, this.smooth);
            smoothPosition.y = cc.misc.lerp(this.node.y, desiredPosition.y, this.smooth);
            this.node.setPosition(smoothPosition);
        }
    }

    onDestroy() {
        GameManager.Instance.node.off('game-state-changed', this.onGameStateChanged, this);
    }

}