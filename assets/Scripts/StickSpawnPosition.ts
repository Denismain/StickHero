const {ccclass, property} = cc._decorator;

@ccclass
export default class StickSpawnPosition extends cc.Component {

    @property({ type: cc.Node })
    stickSpawnNode: cc.Node = null;

    onLoad() {
        cc.director.getScene().on('column-created', this.onColumnCreated, this);
    }

    private onColumnCreated(columnNode: cc.Node) {
        if (this.stickSpawnNode) {
            const columnWorldPosition = columnNode.convertToWorldSpaceAR(cc.Vec3.ZERO);
            const localPosition = this.node.parent.convertToNodeSpaceAR(columnWorldPosition);
            const currentPosition = this.stickSpawnNode.position;
            const targetPosition = (columnNode.width / 2) + localPosition.x;
            const newPosition = new cc.Vec3(targetPosition, currentPosition.y, currentPosition.z);
            this.stickSpawnNode.setPosition(newPosition);
        }
    }

    onDestroy() {
        cc.director.getScene().off('column-created', this.onColumnCreated, this);
    }
}