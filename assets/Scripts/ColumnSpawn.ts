import { GameManager } from './Managers/GameManager';
import { GameState } from './GameStates/GameState';
const { ccclass, property } = cc._decorator;

@ccclass
export default class ColumnSpawn extends cc.Component {

    @property(cc.Prefab)
    columnPrefab: cc.Prefab = null;

    private currentColumn: cc.Node = null;

    onLoad() {
        GameManager.Instance.node.on('game-state-changed', this.onGameStateChanged, this);
    }

    private onGameStateChanged(newState: GameState) {
        if (newState === GameState.NONE) {
            this.spawnColumn();
        }
    }

    private spawnColumn() {
        const columnNode = cc.instantiate(this.columnPrefab);
        const worldPosition = this.currentColumn
            ? this.currentColumn.convertToWorldSpaceAR(cc.Vec3.ZERO)
            : this.node.convertToWorldSpaceAR(cc.Vec3.ZERO);

        const randomXPosition = Math.floor(Math.random() * (400 - 20) + 20) + 200;
        const newXPosition = worldPosition.x + randomXPosition;
        const localPosition = this.node.convertToNodeSpaceAR(new cc.Vec3(newXPosition, worldPosition.y, worldPosition.z));

        const sizeColumn = columnNode.getContentSize();
        const randomWidth = Math.floor(Math.random() * 100) + 60;

        columnNode.setContentSize(randomWidth, sizeColumn.height);
        columnNode.setPosition(localPosition);
        columnNode.parent = this.node;

        this.currentColumn = columnNode;

        // Отправляем событие через cc.director
        cc.director.getScene().emit('column-created', columnNode);
    }

    onDestroy() {
        GameManager.Instance.node.off('game-state-changed', this.onGameStateChanged, this);
    }
}