import { ChestBehavior } from "../script/Scene3D/ChestBehavior";
import { GateBehavior } from "../script/Scene3D/GateBehavior";
import { ItemBehavior } from "../script/Scene3D/ItemBehavior";
import MainCamera from "../script/Scene3D/MainCamera";
import { PlayerRig } from "../script/Scene3D/PlayerRig";
import { TriggerBehavior, TriggerType } from "../script/Scene3D/TriggerBehavior";
import { PlayerManager } from "./PlayerManager";
import Scene3D = Laya.Scene3D;
import Sprite3D = Laya.Sprite3D;
import MeshSprite3D = Laya.MeshSprite3D;
import Vector3 = Laya.Vector3;
import Camera = Laya.Camera;
export class LevelManager {
    constructor() { }
    private static _instance: LevelManager;
    static get Instance(): LevelManager {
        if (!this._instance) {
            this._instance = new LevelManager();
        }
        return this._instance;
    }
    public gateTurnPt: Vector3 = new Vector3();
    public anglePtArr: Array<Vector3> = [];
    public demonPtArr: Array<Vector3> = [];
    SetLevelSceneObjectData(levelScene: Scene3D): void {
        let player: Sprite3D = levelScene.getChildByName("Player") as Sprite3D;
        player.addComponent(PlayerRig);
        PlayerManager.Instance.player = player;
        let mainCamera: Camera = levelScene.getChildByName("Main Camera") as Camera;
        mainCamera.addComponent(MainCamera);

        this._SetSceneDynamicObject(levelScene);
        this._SetTriggerObject(levelScene);
        this._SetPathPointObject(levelScene);
        this._SetItemObject(levelScene);
    }
    private _SetItemObject(levelScene: Scene3D) {
        let item: Sprite3D = levelScene.getChildByName("Item") as Sprite3D;
        for (let i: number = 0; i < item.numChildren; i++) {
            (item.getChildAt(i) as Sprite3D).addComponent(ItemBehavior);
        }
    }
    private _SetPathPointObject(levelScene: Scene3D) {
        let pathPointObject: Sprite3D = levelScene.getChildByName("PathPointObject") as Sprite3D;
        this.gateTurnPt = (pathPointObject.getChildByName("GateTurnPt") as Sprite3D).transform.position;

        this.anglePtArr.push((pathPointObject.getChildByName("AnglePt_1") as Sprite3D).transform.position);
        this.anglePtArr.push((pathPointObject.getChildByName("AnglePt_2") as Sprite3D).transform.position);
        this.anglePtArr.push((pathPointObject.getChildByName("AnglePt_3") as Sprite3D).transform.position);
        this.anglePtArr.push((pathPointObject.getChildByName("AnglePt_4") as Sprite3D).transform.position);
        this.anglePtArr.push((pathPointObject.getChildByName("AnglePt_5") as Sprite3D).transform.position);

        this.demonPtArr.push((pathPointObject.getChildByName("DemonPt_1") as Sprite3D).transform.position);
        this.demonPtArr.push((pathPointObject.getChildByName("DemonPt_2") as Sprite3D).transform.position);
        this.demonPtArr.push((pathPointObject.getChildByName("DemonPt_3") as Sprite3D).transform.position);
        this.demonPtArr.push((pathPointObject.getChildByName("DemonPt_4") as Sprite3D).transform.position);
        this.demonPtArr.push((pathPointObject.getChildByName("DemonPt_5") as Sprite3D).transform.position);
    }
    private _SetSceneDynamicObject(levelScene: Scene3D) {
        let sceneDynamicObject: Sprite3D = levelScene.getChildByName("SceneDynamicObject") as Sprite3D;
        //大门
        let left_door: MeshSprite3D = sceneDynamicObject.getChildByName("Column_Left") as MeshSprite3D;
        let right_door: MeshSprite3D = sceneDynamicObject.getChildByName("Column_Right") as MeshSprite3D;
        let gateBehavior: GateBehavior = (left_door.getChildAt(0) as MeshSprite3D).addComponent(GateBehavior);
        gateBehavior.direction = "left";
        gateBehavior = (right_door.getChildAt(0) as MeshSprite3D).addComponent(GateBehavior);
        gateBehavior.direction = "right";
        //宝箱
        let angleChest: MeshSprite3D = ((sceneDynamicObject.getChildByName("AngleChest") as Sprite3D).getChildByName("GameOject") as Sprite3D).getChildByName("ChestUpAngel") as MeshSprite3D;
        let demonChest: MeshSprite3D = ((sceneDynamicObject.getChildByName("DemonChest") as Sprite3D).getChildByName("GameOject") as Sprite3D).getChildByName("ChestUpDemon") as MeshSprite3D;
        let chestBehavior: ChestBehavior = angleChest.addComponent(ChestBehavior);
        chestBehavior = demonChest.addComponent(ChestBehavior);
    }
    private _SetTriggerObject(levelScene: Scene3D) {
        let triggerObject: Sprite3D = levelScene.getChildByName("TrigerObject") as Sprite3D;
        let gateTrigger: Sprite3D = triggerObject.getChildByName("GateTrigger") as Sprite3D;
        let angleChestTrigger: Sprite3D = triggerObject.getChildByName("AngleChestTrigger") as Sprite3D;
        let demonChestTrigger: Sprite3D = triggerObject.getChildByName("DemonChestTrigger") as Sprite3D;
        let triggerBehavior: TriggerBehavior = gateTrigger.addComponent(TriggerBehavior);
        triggerBehavior.type = TriggerType.Gate;
        triggerBehavior = angleChestTrigger.addComponent(TriggerBehavior);
        triggerBehavior.type = TriggerType.AngleChest;
        triggerBehavior = demonChestTrigger.addComponent(TriggerBehavior);
        triggerBehavior.type = TriggerType.DemonChest;
    }
}