const { ccclass } = cc._decorator;

@ccclass
export default class ScoreLabel extends cc.Component {

    onLoad() {
        cc.director.on('red-point', this.onRedPoint, this);
        this.node.active = false;
    }

    private onRedPoint() {
        this.node.active = true;
        this.scheduleOnce(() => {
            this.node.active = false;
        }, 0.8);
    }

    onDestroy() {
        cc.director.off('red-point', this.onRedPoint, this);
    }
}