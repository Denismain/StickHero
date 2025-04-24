const { ccclass } = cc._decorator;

@ccclass
export default class PlusOne extends cc.Component {

    private currentColumn: cc.Node = null;

    onLoad() {
        cc.director.on('red-point', this.onRedPoint, this);
        cc.director.on('column-created', this.onColumnCreated, this);
        this.node.active = false;
    }

    private onColumnCreated(columnNode: cc.Node) {
        this.currentColumn = columnNode;
    }

    private setPos() {
        if (this.currentColumn) {
            this.node.setPosition(this.currentColumn.position);
        }
    }

    private onRedPoint() {
        this.node.active = true;
        this.setPos();
        this.scheduleOnce(() => {
            this.node.active = false;
        }, 0.8);
    }

    onDestroy() {
        cc.director.off('red-point', this.onRedPoint, this);
        cc.director.off('column-created', this.onColumnCreated, this);
    }
}