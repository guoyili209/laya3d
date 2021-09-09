import { GameEvent, GameEventType } from "../Events/GameEvent";
import MainUI from "../script/uis/MainUI";
import { LevelManager } from "./LevelManager";
import MeshSprite3D = Laya.MeshSprite3D;
import Camera = Laya.Camera;
export class SceneManager {
    constructor() { this._Init(); }
    private static _instance: SceneManager;
    static get Instance(): SceneManager {
        if (this._instance == null) {
            this._instance = new SceneManager();
        }
        return this._instance;
    }
    public gameScene: MainUI;
    public player: MeshSprite3D;
    public camera: Camera;

    private _Init() {
        GameEvent.eventDispatcher.on(GameEventType.EnterLevel, this, this._EnterLevel);
    }
    private _EnterLevel(): void {
        let levelScene: Laya.Scene3D = this.gameScene.InitScene();
        LevelManager.Instance.SetLevelSceneObjectData(levelScene);
    }
}