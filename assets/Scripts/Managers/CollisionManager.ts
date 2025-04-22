const { ccclass } = cc._decorator;

@ccclass
export default class CollisionManager extends cc.Component {

    onLoad() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //manager.enabledDebugDraw = true;
        //manager.enabledDrawBoundingBox = true;
    }
}