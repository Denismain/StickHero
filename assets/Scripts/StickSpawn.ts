import { GameManager } from './Managers/GameManager';
import { GameState } from './GameStates/GameState';
const { ccclass, property } = cc._decorator;

@ccclass
export default class StickSpawn extends cc.Component {

    @property(cc.Prefab)
    stickPrefab: cc.Prefab = null;

    private currentStick: cc.Node = null;

    onLoad() {
        GameManager.Instance.node.on('game-state-changed', this.onGameStateChanged, this);
    }

    private onGameStateChanged(newState: GameState) {
        if (newState === GameState.NONE) {
            this.spawnStick();
        }
    }

    private spawnStick() {
        const stickNode = cc.instantiate(this.stickPrefab);

        const worldPosition = this.currentStick
            ? this.currentStick.convertToWorldSpaceAR(cc.Vec3.ZERO)
            : this.node.convertToWorldSpaceAR(cc.Vec3.ZERO);

        const localPosition = this.node.convertToNodeSpaceAR(new cc.Vec3(worldPosition.x, worldPosition.y, worldPosition.z));


        stickNode.setPosition(cc.v3(localPosition));
        stickNode.parent = this.node;

        this.currentStick = stickNode;
    }

    onDestroy() {
        GameManager.Instance.node.off('game-state-changed', this.onGameStateChanged, this);
    }
}