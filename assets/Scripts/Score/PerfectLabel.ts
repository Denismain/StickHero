const {ccclass, property} = cc._decorator;

@ccclass
export default class ScoreLabel extends cc.Component {

    onLoad() {
        cc.director.on('red-point', this.onRedPoint, this);
        this.node.active = false;
    }

    onRedPoint() {
        this.node.active = true;
        cc.tween(this.node)
            .delay(1)
            .call(() => {
                this.node.active = false;
            })
            .start();
    }
    onDestroy() {
        cc.director.off('red-point', this.onRedPoint, this);
    }
}