import MeshSprite3D = Laya.MeshSprite3D;
import Sprite3D = Laya.Sprite3D;
export class PlayerManager {
    constructor() { }
    private static _instance: PlayerManager;
    static get Instance(): PlayerManager {
        if (!this._instance) {
            this._instance = new PlayerManager();
        }
        return this._instance;
    }
    public player: Sprite3D;
}