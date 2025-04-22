import { GameManager } from './Managers/GameManager';
import { GameState } from './GameStates/GameState';
const { ccclass, property } = cc._decorator;

@ccclass
export default class StickSpawnPosition extends cc.Component {

    @property({ type: cc.Node })
    stickSpawnNode: cc.Node = null;

    private columnNode: cc.Node = null;

    onLoad() {
        cc.director.getScene().on('column-created', this.onColumnCreated, this);
        GameManager.Instance.node.on('game-state-changed', this.onGameStateChanged, this);
    }

    private onGameStateChanged(newState: GameState) {
        if (newState === GameState.MOVING) {
            this.spawnChanged();
        }
    }

    private spawnChanged() {
        if (this.stickSpawnNode && this.columnNode) {
            const columnWorldPosition = this.columnNode.convertToWorldSpaceAR(cc.Vec3.ZERO);
            const targetPosition = (this.columnNode.width * this.columnNode.scaleX) / 2;
            this.stickSpawnNode.x = columnWorldPosition.x + targetPosition;
        }
    }

    private onColumnCreated(columnNode: cc.Node) {
        this.columnNode = columnNode;
    }

    onDestroy() {
        cc.director.getScene().off('column-created', this.onColumnCreated, this);
        GameManager.Instance.node.off('game-state-changed', this.onGameStateChanged, this);
    }
}