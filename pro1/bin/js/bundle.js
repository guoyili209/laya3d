(function () {
    'use strict';

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
            let levelSp3d = Laya.loader.getRes("res/Asset3D/Conventional/level1.ls");
            this.addChild(levelSp3d);
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
            let resource = [
                "res/Asset3D/Conventional/level1.ls"
            ];
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
            Laya.stage.addChild(new MainUI());
        }
    }
    new Main();

}());
