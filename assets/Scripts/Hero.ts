import { GameManager } from './Managers/GameManager';
import { GameState } from './GameStates/GameState';
const { ccclass, property } = cc._decorator;

@ccclass
export default class Hero extends cc.Component {

    @property({ type: cc.Float })
    speedX: number = 100;

    @property({ type: cc.Node, tooltip: "hero node for raycast" })
    heroNode: cc.Node = null;

    @property({ tooltip: "Ray length" })
    length: number = 100;

    private currentColumn: cc.Node = null;
    private hero: cc.RigidBody = null; 
    private raycastResults: cc.PhysicsRayCastResult[] = [];
    private raycastDirection: cc.Vec2 = new cc.Vec2(0, -1);

    onLoad() {
        this.hero = this.getComponent(cc.RigidBody);
        GameManager.Instance.node.on('game-state-changed', this.onGameStateChanged, this);
        cc.director.getScene().on('column-created', this.onColumnCreated, this);
    }

    private onGameStateChanged(newState: GameState) {
        if (newState === GameState.MOVING) {
            this.startMoving();
        }
    }

    private onColumnCreated(columnNode: cc.Node) {
        this.currentColumn = columnNode; // Сохраняем ссылку на текущую колонну
    }

    private startMoving() {
        this.hero.linearVelocity = cc.v2(this.speedX, 0);
    }

    private stopMoving() {

        if (this.currentColumn && GameManager.Instance.gameState === GameState.MOVING) {
            // Получаем позицию колонны
        this.hero.linearVelocity = cc.v2(0, 0);


            let columnPosition = this.currentColumn.convertToWorldSpaceAR(cc.v2(0, 0));

            // Вычисляем целевую позицию
            let targetX = columnPosition.x + 10;
            let targetPosition = cc.v2(targetX, this.node.position.y); // Сохраняем Y

            // Устанавливаем новую позицию герою
            this.node.setPosition(targetPosition);


        GameManager.Instance.gameState = GameState.NONE;
        }
    }

    update() {
        this.Raycast();
    }

    private Raycast() {
        const originPos = this.heroNode.convertToWorldSpaceAR(cc.v2(0, 0));
        const endPos = originPos.add(this.raycastDirection.mul(this.length));

        this.raycastResults = cc.director.getPhysicsManager().rayCast(
            originPos,
            endPos,
            cc.RayCastType.All
        );

        if (this.raycastResults.length > 0) {
            for (let i = 0; i < this.raycastResults.length; i++) {
                const collider = this.raycastResults[i].collider;
                if (collider.node.name === "Column") {
                    console.log("Hit Column");
                    this.stopMoving();
                    break;
                }
            }
        }
    }

    onDestroy() {
        GameManager.Instance.node.off('game-state-changed', this.onGameStateChanged, this);
        cc.director.getScene().off('column-created', this.onColumnCreated, this);
    }

}
