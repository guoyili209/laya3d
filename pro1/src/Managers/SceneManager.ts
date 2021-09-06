import MeshSprite3D = Laya.MeshSprite3D;
import Camera = Laya.Camera;
export class SceneManager extends Laya.Script3D {
    constructor() { super(); }
    // private static _instance: SceneManager;
    // static get Instance(): SceneManager {
    //     if (this._instance == null) {
    //         this._instance = new SceneManager();
    //     }
    //     return this._instance;
    // }
    public static Instance: SceneManager;
    public player: MeshSprite3D;
    public camera: Camera;
    onAwake() {
        SceneManager.Instance = this;
    }
    onStart() {
        console.log("SceneMgr start");
    }
}