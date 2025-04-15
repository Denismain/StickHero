const { ccclass } = cc._decorator;

@ccclass
export default class PhysicsManager extends cc.Component {
    onLoad() {
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        physicsManager.gravity = cc.v2(0, -2000);
    }
}