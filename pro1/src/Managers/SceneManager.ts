import MeshSprite3D = Laya.MeshSprite3D;
import Camera = Laya.Camera;
export class SceneManager {
    constructor() { }
    private static _instance: SceneManager;
    static get Instance(): SceneManager {
        if (this._instance == null) {
            this._instance = new SceneManager();
        }
        return this._instance;
    }
    public player: MeshSprite3D;
    public camera: Camera;
    
    
}