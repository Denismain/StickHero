import { GameManager } from '../Managers/GameManager';
import { GameState } from '../GameStates/GameState';
import { Score } from '../Score/Score';
const { ccclass } = cc._decorator;

@ccclass
export default class Hero extends cc.Component {

    private moveSpeed: number = 300;
    private currentColumn: cc.Node = null;
    private currentStick: cc.Node = null;
    private hero: cc.RigidBody = null;
    private columnValue: number = 1;

    onLoad() {
        this.hero = this.getComponent(cc.RigidBody);
        GameManager.Instance.node.on('game-state-changed', this.onGameStateChanged, this);
        cc.director.getScene().on('column-created', this.onColumnCreated, this);
        cc.director.getScene().on('stick-created', this.onStickCreated, this);
    }

    private onGameStateChanged(newState: GameState) {
        if (newState === GameState.MOVING) {
            this.stickMoving();
        }
    }

    //update() {
    //    console.log("Current State Game: ", GameManager.Instance.gameState);
    //}

    private onColumnCreated(columnNode: cc.Node) {
        this.currentColumn = columnNode;
    }
    private onStickCreated(stickNode: cc.Node) {
        this.currentStick = stickNode;
    }

    private moving() {
        const columnWidth = this.currentColumn.width * this.currentColumn.scaleX - 85;
        const targetX = this.currentColumn.convertToWorldSpaceAR(cc.Vec2.ZERO).x + (columnWidth / 2);

        const distance = Math.abs(targetX - this.hero.node.position.x);
        const moveDuration = distance / this.moveSpeed;

        cc.tween(this.hero.node)
            .to(moveDuration, { position: cc.v3(targetX, this.hero.node.position.y, this.hero.node.position.z) }, { easing: 'linear' })
            .call(() => {
                this.callbackMoving();
            })
            .start();
    }

    private callbackMoving() {
        const scoreManager = GameManager.Instance.node.getComponent(Score);
        if (scoreManager) {
            scoreManager.addScore(this.columnValue);
        }
        if (this.currentColumn && GameManager.Instance.gameState === GameState.MOVING) {
            GameManager.Instance.gameState = GameState.NONE;
        }
    }

    private stickMoving() {
        const sprite = this.currentStick.getComponentInChildren(cc.Sprite);
        const height = sprite.node.height;
        const stickHeight = height * this.currentStick.scaleY; 
        const targetX = this.currentStick.convertToWorldSpaceAR(cc.Vec2.ZERO).x + (stickHeight);

        const distance = Math.abs(targetX - this.hero.node.position.x);
        const moveDuration = distance / this.moveSpeed;

        cc.tween(this.hero.node)
            .to(moveDuration, { position: cc.v3(targetX, this.hero.node.position.y, this.hero.node.position.z) }, { easing: 'linear' })
            .call(() => {
                this.callbackGameOver();
            })
            .start();
    }

    private callbackGameOver() {
        if (GameManager.Instance.gameState !== GameState.STICK_MOVING) {
            this.moving();
        } else {
            GameManager.Instance.gameState = GameState.FALL;
        }
    }

    onDestroy() {
        GameManager.Instance.node.off('game-state-changed', this.onGameStateChanged, this);
        cc.director.getScene().off('column-created', this.onColumnCreated, this);
        cc.director.getScene().off('stick-created', this.onStickCreated, this);
    }

}
