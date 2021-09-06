import MeshSprite3D = Laya.MeshSprite3D;
export class PlayerManager {
    constructor() { }
    private static _instance: PlayerManager;
    static get Instance(): PlayerManager {
        if (!this._instance) {
            this._instance = new PlayerManager();
        }
        return this._instance;
    }
    public player: MeshSprite3D;
}