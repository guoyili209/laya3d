(function () {
    'use strict';

    var EventDispatcher = Laya.EventDispatcher;
    class GameEvent {
    }
    GameEvent.eventDispatcher = new EventDispatcher;
    class GameEventType {
    }
    GameEventType.EnterLevel = "enter_level";
    GameEventType.StartGame = "start_game";
    GameEventType.GameOver = "game_over";
    GameEventType.OpenGate = "open_gate";
    GameEventType.OpenChest = "open_chest";

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
        }
    }
    GameConfig.width = 750;
    GameConfig.height = 1334;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "vertical";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "Main.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class AssetsPathManager {
        constructor() {
        }
        static Assets3dPath() {
            return AssetsPathManager.levelAssetPathArr;
        }
        static GetLevelAssetsPath(levelNu) {
            return AssetsPathManager.levelAssetPathArr[levelNu - 1];
        }
    }
    AssetsPathManager.levelAssetPathArr = [
        { url: "res/Asset3D/Conventional/level1.ls" },
        { url: "res/Asset3D/Conventional/level2.ls" }
    ];

    class GameDataManager {
        constructor() {
            this.curLevelNu = -1;
        }
        static get Instance() {
            if (this._instance == null) {
                this._instance = new GameDataManager();
            }
            return this._instance;
        }
        InitData() {
            this.curLevelNu = 1;
        }
    }

    class ChestBehavior extends Laya.Script3D {
        constructor() {
            super();
        }
        onStart() {
            GameEvent.eventDispatcher.on(GameEventType.OpenChest, this, this._OpenChest);
        }
        _OpenChest() {
            console.log("打开箱子");
        }
    }

    class GateBehavior extends Laya.Script3D {
        constructor() {
            super();
            this.direction = "left";
        }
        onAwake() {
        }
        onStart() {
            GameEvent.eventDispatcher.on(GameEventType.OpenGate, this, this._OpenGate);
        }
        _OpenGate() {
        }
        onTriggerEnter(other) {
        }
    }

    class ItemManager {
        constructor() { }
    }
    class ItemType {
    }
    ItemType.angle_a_book = "Angle_A-Book";
    ItemType.demon_d_skull = "Demon_D-Skull";

    class ItemBehavior extends Laya.Script3D {
        constructor() { super(); }
        onStart() {
            this.type = this.owner.name;
        }
        onTriggerEnter(other) {
            if (other.owner.name == "Player") {
                if (this.type.indexOf(ItemType.angle_a_book) > -1) {
                    console.log("angle a book");
                }
                else if (this.type.indexOf(ItemType.demon_d_skull) > -1) {
                    console.log("demon d skull");
                }
            }
        }
    }

    var Vector3 = Laya.Vector3;
    class MainCamera extends Laya.Script3D {
        constructor() {
            super();
            this.intType = 1000;
            this.numType = 1000;
            this.strType = "hello laya";
            this.boolType = true;
            this._distanceUp = 15;
            this._distanceAway = 10;
            this._smooth = 2;
            this._camDepthSmooth = 5;
        }
        onAwake() {
            this.rot = new Laya.Quaternion();
            this._upVec = new Laya.Vector3(0, 1, 0);
            this._forwardVec = new Laya.Vector3(0, 0, 1);
            this._camera = this.owner;
            this._newPos = new Laya.Vector3(0, 0, 0);
            this._newRoation = new Laya.Quaternion();
            this._followVec3 = new Vector3();
            this._disPosVec = new Vector3();
            this._cameraNewPos = new Vector3();
            this._distanceUpVec3 = new Vector3();
            this._distanceAwayVec3 = new Vector3();
        }
        onEnable() {
        }
        onDisable() {
        }
        onUpdate() {
            if (!this._player) {
                this._player = SceneManager.Instance.player;
            }
            if (!this._player)
                return;
            let nu = Laya.timer.delta * 0.0001;
            if (SceneManager.Instance.player) {
                Vector3.subtract(this._player.transform.position, this._camera.transform.position, this._followVec3);
                this._camera.transform.position = this._followVec3;
                Vector3.scale(this._upVec, this._distanceUp, this._distanceUpVec3);
                Vector3.scale(this._forwardVec, this._distanceAway, this._distanceAwayVec3);
                Vector3.add(this._player.transform.position, this._distanceUpVec3, this._disPosVec);
                Vector3.subtract(this._disPosVec, this._distanceAwayVec3, this._disPosVec);
                Vector3.lerp(this._camera.transform.position, this._disPosVec, Laya.timer.delta, this._cameraNewPos);
                this._camera.transform.position = this._cameraNewPos;
                this._camera.transform.lookAt(this._player.transform.position, this._upVec);
            }
        }
    }

    class PlayerRig extends Laya.Script3D {
        constructor() { super(); }
        onAwake() {
        }
        onEnable() {
        }
        onStart() {
            this._speedVec3 = new Laya.Vector3(0, 0, 1);
            this._animator = this.owner.getComponent(Laya.Animator);
            this._charactorController = this.owner.getComponent(Laya.CharacterController);
        }
        onDisable() {
        }
        onUpdate() {
            this._speedVec3.z *= Laya.timer.delta;
            this._charactorController.move(this._speedVec3);
        }
    }

    class TriggerBehavior extends Laya.Script3D {
        constructor() {
            super();
        }
        onTriggerEnter(other) {
            if (other.owner.name == "Player") {
                if (this.type == TriggerType.Gate) {
                }
                else if (this.type == TriggerType.AngleChest) {
                }
                else if (this.type == TriggerType.DemonChest) {
                }
            }
        }
    }
    var TriggerType;
    (function (TriggerType) {
        TriggerType[TriggerType["Gate"] = 0] = "Gate";
        TriggerType[TriggerType["AngleChest"] = 1] = "AngleChest";
        TriggerType[TriggerType["DemonChest"] = 2] = "DemonChest";
    })(TriggerType || (TriggerType = {}));

    class PlayerManager {
        constructor() { }
        static get Instance() {
            if (!this._instance) {
                this._instance = new PlayerManager();
            }
            return this._instance;
        }
    }

    var Vector3$1 = Laya.Vector3;
    class LevelManager {
        constructor() {
            this.gateTurnPt = new Vector3$1();
            this.anglePtArr = [];
            this.demonPtArr = [];
        }
        static get Instance() {
            if (!this._instance) {
                this._instance = new LevelManager();
            }
            return this._instance;
        }
        SetLevelSceneObjectData(levelScene) {
            let player = levelScene.getChildByName("Player");
            player.addComponent(PlayerRig);
            PlayerManager.Instance.player = player;
            let mainCamera = levelScene.getChildByName("Main Camera");
            mainCamera.addComponent(MainCamera);
            this._SetSceneDynamicObject(levelScene);
            this._SetTriggerObject(levelScene);
            this._SetPathPointObject(levelScene);
            this._SetItemObject(levelScene);
        }
        _SetItemObject(levelScene) {
            let item = levelScene.getChildByName("Item");
            for (let i = 0; i < item.numChildren; i++) {
                item.getChildAt(i).addComponent(ItemBehavior);
            }
        }
        _SetPathPointObject(levelScene) {
            let pathPointObject = levelScene.getChildByName("PathPointObject");
            this.gateTurnPt = pathPointObject.getChildByName("GateTurnPt").transform.position;
            this.anglePtArr.push(pathPointObject.getChildByName("AnglePt_1").transform.position);
            this.anglePtArr.push(pathPointObject.getChildByName("AnglePt_2").transform.position);
            this.anglePtArr.push(pathPointObject.getChildByName("AnglePt_3").transform.position);
            this.anglePtArr.push(pathPointObject.getChildByName("AnglePt_4").transform.position);
            this.anglePtArr.push(pathPointObject.getChildByName("AnglePt_5").transform.position);
            this.demonPtArr.push(pathPointObject.getChildByName("DemonPt_1").transform.position);
            this.demonPtArr.push(pathPointObject.getChildByName("DemonPt_2").transform.position);
            this.demonPtArr.push(pathPointObject.getChildByName("DemonPt_3").transform.position);
            this.demonPtArr.push(pathPointObject.getChildByName("DemonPt_4").transform.position);
            this.demonPtArr.push(pathPointObject.getChildByName("DemonPt_5").transform.position);
        }
        _SetSceneDynamicObject(levelScene) {
            let sceneDynamicObject = levelScene.getChildByName("SceneDynamicObject");
            let left_door = sceneDynamicObject.getChildByName("Column_Left");
            let right_door = sceneDynamicObject.getChildByName("Column_Right");
            let gateBehavior = left_door.getChildAt(0).addComponent(GateBehavior);
            gateBehavior.direction = "left";
            gateBehavior = right_door.getChildAt(0).addComponent(GateBehavior);
            gateBehavior.direction = "right";
            let angleChest = sceneDynamicObject.getChildByName("AngleChest").getChildByName("GameOject").getChildByName("ChestUpAngel");
            let demonChest = sceneDynamicObject.getChildByName("DemonChest").getChildByName("GameOject").getChildByName("ChestUpDemon");
            let chestBehavior = angleChest.addComponent(ChestBehavior);
            chestBehavior = demonChest.addComponent(ChestBehavior);
        }
        _SetTriggerObject(levelScene) {
            let triggerObject = levelScene.getChildByName("TrigerObject");
            let gateTrigger = triggerObject.getChildByName("GateTrigger");
            let angleChestTrigger = triggerObject.getChildByName("AngleChestTrigger");
            let demonChestTrigger = triggerObject.getChildByName("DemonChestTrigger");
            let triggerBehavior = gateTrigger.addComponent(TriggerBehavior);
            triggerBehavior.type = TriggerType.Gate;
            triggerBehavior = angleChestTrigger.addComponent(TriggerBehavior);
            triggerBehavior.type = TriggerType.AngleChest;
            triggerBehavior = demonChestTrigger.addComponent(TriggerBehavior);
            triggerBehavior.type = TriggerType.DemonChest;
        }
    }

    class SceneManager {
        constructor() { this._Init(); }
        static get Instance() {
            if (this._instance == null) {
                this._instance = new SceneManager();
            }
            return this._instance;
        }
        _Init() {
            GameEvent.eventDispatcher.on(GameEventType.EnterLevel, this, this._EnterLevel);
        }
        _EnterLevel() {
            let levelScene = this.gameScene.InitScene();
            LevelManager.Instance.SetLevelSceneObjectData(levelScene);
        }
    }

    var Scene = Laya.Scene;
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        class MainUI extends Scene {
            constructor() {
                super();
            }
            createChildren() {
                super.createChildren();
                this.createView(MainUI.uiView);
            }
        }
        MainUI.uiView = { "type": "Scene", "props": { "width": 750, "height": 1334 }, "compId": 2, "child": [{ "type": "Image", "props": { "y": 994, "x": 309, "width": 66, "skin": "ui/TutorialHand.png", "height": 90 }, "compId": 34, "child": [{ "type": "Label", "props": { "y": -30, "text": "滑动屏幕玩游戏", "strokeColor": "#000000", "stroke": 1, "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffffff", "centerX": 0, "bold": true }, "compId": 38 }] }, { "type": "Image", "props": { "y": 0, "x": 0, "var": "startBtn", "top": 0, "skin": "ui/BG_rounded_512.png", "right": 0, "left": 0, "bottom": 0 }, "compId": 36 }], "loadList": ["ui/TutorialHand.png", "ui/BG_rounded_512.png"], "loadList3D": [] };
        ui.MainUI = MainUI;
        REG("ui.MainUI", MainUI);
    })(ui || (ui = {}));

    class MainUI extends ui.MainUI {
        constructor() {
            super();
            this.startBtn.alpha = 0;
        }
        InitScene() {
            let levelAssetPathObj = AssetsPathManager.GetLevelAssetsPath(GameDataManager.Instance.curLevelNu);
            let levelScene3d = Laya.loader.getRes(levelAssetPathObj.url);
            this.addChildAt(levelScene3d, 0);
            return levelScene3d;
        }
    }

    var Loader = Laya.Loader;
    var Handler = Laya.Handler;
    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            var urls = [
                { url: "res/layabox.png", type: Loader.IMAGE },
                { url: "res/atlas/ui.atlas", type: Loader.ATLAS },
                { url: "res/atlas/comp.atlas", type: Loader.ATLAS }
            ];
            Laya.loader.load(urls, Handler.create(this, this.onAssetLoaded), Handler.create(this, this.onLoading, null, false));
            Laya.loader.on(Laya.Event.ERROR, this, this.onError);
        }
        onAssetLoaded() {
            console.log("ui资源加载结束");
            let resource = AssetsPathManager.Assets3dPath();
            console.log(resource);
            Laya.loader.create(resource, Laya.Handler.create(this, this.onAsset3DLoaded), Handler.create(this, this.onLoading, null, false));
        }
        onLoading(progress) {
            console.log("加载进度: " + progress);
        }
        onError(err) {
            console.log("加载失败: " + err);
        }
        onAsset3DLoaded() {
            console.log("3d资源加载结束");
            GameDataManager.Instance.InitData();
            let gameScene = new MainUI();
            SceneManager.Instance.gameScene = gameScene;
            Laya.stage.addChild(gameScene);
            GameEvent.eventDispatcher.event(GameEventType.EnterLevel);
        }
    }
    new Main();

}());
