import { GameState } from '../GameStates/GameState';
const { ccclass } = cc._decorator;

@ccclass
export class GameManager extends cc.Component {

    private static _instanse: GameManager | null = null;

    private _gameState: GameState = GameState.INITIAL;
    public initialState: GameState = GameState.INITIAL;

    public static get Instance(): GameManager {
        if (this._instanse === null) {
            this._instanse = new GameManager();
        }
        return this._instanse;
    }

    onLoad() {
        if (GameManager._instanse) {
            this.destroy();
            return;
        }
        GameManager._instanse = this;
        this.gameState = this.initialState;
    }

    get gameState(): GameState {
        return this._gameState;
    }

    set gameState(newState: GameState) {
        if (this._gameState !== newState) {
            this._gameState = newState;
            this.node.emit('game-state-changed', newState);
        }
    }

    onDestroy() {
        if (GameManager._instanse === this) {
            GameManager._instanse = null;
        }
    }
}