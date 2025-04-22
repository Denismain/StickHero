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

        const randomScaleX = Math.random() * 1.5 + 0.4;
        const scaleColumn = columnNode.getScale(cc.v2());

        columnNode.setScale(randomScaleX, scaleColumn.y);
        columnNode.setPosition(localPosition);
        columnNode.parent = this.node;

        this.currentColumn = columnNode;

        cc.director.getScene().emit('column-created', columnNode);
    }

    onDestroy() {
        GameManager.Instance.node.off('game-state-changed', this.onGameStateChanged, this);
    }
}