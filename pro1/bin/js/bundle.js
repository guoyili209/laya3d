(function () {
    'use strict';

    class SceneManager extends Laya.Script3D {
        constructor() { super(); }
        onAwake() {
            SceneManager.Instance = this;
        }
        onStart() {
            console.log("SceneMgr start");
        }
    }

    class MainCamera extends Laya.Script3D {
        constructor() {
            super();
            this.intType = 1000;
            this.numType = 1000;
            this.strType = "hello laya";
            this.boolType = true;
        }
        onAwake() {
            this.rot = new Laya.Quaternion();
            this._upVec = new Laya.Vector3(0, 1, 0);
            this._camera = this.owner;
            this._newPos = new Laya.Vector3(0, 0, 0);
            this._newRoation = new Laya.Quaternion();
        }
        onEnable() {
        }
        onDisable() {
        }
        onUpdate() {
            let nu = Laya.timer.delta * 0.0001;
            if (SceneManager.Instance.player) {
                let pos = this._camera.transform.localPosition;
                this.rot.rotateY(nu, this.rot);
                let dir = new Laya.Vector3();
                Laya.Vector3.subtract(pos, SceneManager.Instance.player.transform.localPosition, dir);
                Laya.Vector3.transformQuat(dir, this.rot, dir);
                this._newPos.setValue(0, 0, 0);
                Laya.Vector3.add(SceneManager.Instance.player.transform.localPosition, dir, this._newPos);
                this._camera.transform.position = this._newPos;
            }
        }
    }

    class Movement extends Laya.Script3D {
        constructor() {
            super();
            this.intType = 1000;
            this.numType = 1000;
            this.strType = "hello laya";
            this.boolType = true;
        }
        onAwake() {
        }
        onEnable() {
        }
        onStart() {
            this._cube = this.owner;
            this._transform = this._cube.transform;
        }
        onDisable() {
        }
        onUpdate() {
        }
    }

    var Scene = Laya.Scene;
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        var test;
        (function (test) {
            class TestSceneUI extends Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("test/TestScene");
                }
            }
            test.TestSceneUI = TestSceneUI;
            REG("ui.test.TestSceneUI", TestSceneUI);
        })(test = ui.test || (ui.test = {}));
    })(ui || (ui = {}));

    class GameUI extends ui.test.TestSceneUI {
        constructor() {
            super();
            var scene = Laya.stage.addChild(new Laya.Scene3D());
            var camera = (scene.addChild(new Laya.Camera(0, 0.1, 100)));
            camera.transform.translate(new Laya.Vector3(0, 3, 3));
            camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
            camera.addComponent(MainCamera);
            var directionLight = scene.addChild(new Laya.DirectionLight());
            directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
            directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));
            var box = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1)));
            box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
            var material = new Laya.BlinnPhongMaterial();
            material.albedoTexture = Laya.loader.getRes("res/layabox.png");
            box.meshRenderer.material = material;
            box.addComponent(Movement);
            let scenemMgr = scene.addComponent(SceneManager);
            scenemMgr.player = box;
        }
    }

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("script/GameUI.ts", GameUI);
        }
    }
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "test/TestScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

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
                { url: "res/atlas/comp.atlas", type: Loader.ATLAS }
            ];
            Laya.loader.load(urls, Handler.create(this, this.onAssetLoaded), Handler.create(this, this.onLoading, null, false));
            Laya.loader.on(Laya.Event.ERROR, this, this.onError);
        }
        onAssetLoaded() {
            console.log("加载结束");
            this.onConfigLoaded();
        }
        onLoading(progress) {
            console.log("加载进度: " + progress);
        }
        onError(err) {
            console.log("加载失败: " + err);
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
