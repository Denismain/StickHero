import { GameManager } from '../Managers/GameManager';
import { GameState } from '../GameStates/GameState';
const { ccclass, property } = cc._decorator;

@ccclass
export default class StickSpawn extends cc.Component {

    @property(cc.Prefab)
    stickPrefab: cc.Prefab = null;
    private spawnStikcs: cc.Node[] = [];

    onLoad() {
        GameManager.Instance.node.on('game-state-changed', this.onGameStateChanged, this);
    }

    private onGameStateChanged(newState: GameState) {
        if (newState === GameState.NONE) {
            this.spawnStick();
        }
        if (newState === GameState.LOAD) {
            this.destroySticks();
        }
    }

    private spawnStick() {
        const stickNode = cc.instantiate(this.stickPrefab);
        stickNode.position = this.node.convertToWorldSpaceAR(cc.Vec3.ZERO);
        cc.director.getScene().addChild(stickNode);
        this.spawnStikcs.push(stickNode);
        cc.director.getScene().emit('stick-created', stickNode);
    }

    private destroySticks() {
        for (let i = 0; i < this.spawnStikcs.length; i++) {
            this.spawnStikcs[i].destroy();
        }
        this.spawnStikcs = [];
    }

    onDestroy() {
        GameManager.Instance.node.off('game-state-changed', this.onGameStateChanged, this);
    }
}