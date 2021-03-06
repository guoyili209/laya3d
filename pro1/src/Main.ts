import { GameEvent, GameEventType } from "./Events/GameEvent";
import GameConfig from "./GameConfig";
import { AssetsPathManager } from "./Managers/AssetsPathManager";
import { GameDataManager } from "./Managers/GameDataManager";
import { SceneManager } from "./Managers/SceneManager";
import MainUI from "./script/uis/MainUI";
import { ui } from "./ui/layaMaxUI";
import Loader = Laya.Loader;
import Handler = Laya.Handler;
class Main {
	constructor() {
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		Laya.stage.alignV = GameConfig.alignV;
		Laya.stage.alignH = GameConfig.alignH;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError(true);

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		// Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));

		var urls: Array<any> = [
			{ url: "res/layabox.png", type: Loader.IMAGE },
			{ url: "res/atlas/ui.atlas", type: Loader.ATLAS },
			{ url: "res/atlas/comp.atlas", type: Loader.ATLAS }
		];
		Laya.loader.load(urls, Handler.create(this, this.onAssetLoaded), Handler.create(this, this.onLoading, null, false));

		// 侦听加载失败
		Laya.loader.on(Laya.Event.ERROR, this, this.onError);

	}
	private onAssetLoaded(): void {
		// 使用texture
		console.log("ui资源加载结束");
		let resource: Array<string> = AssetsPathManager.Assets3dPath();
		console.log(resource);
		Laya.loader.create(resource, Laya.Handler.create(this, this.onAsset3DLoaded), Handler.create(this, this.onLoading, null, false));
	}

	// 加载进度侦听器
	private onLoading(progress: number): void {
		console.log("加载进度: " + progress);
	}

	private onError(err: String): void {
		console.log("加载失败: " + err);
	}
	
	onAsset3DLoaded(): void {
		console.log("3d资源加载结束");
		//加载IDE指定的场景
		// GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
		GameDataManager.Instance.InitData();
		let gameScene: MainUI = new MainUI();
		SceneManager.Instance.gameScene = gameScene;
		Laya.stage.addChild(gameScene);

		GameEvent.eventDispatcher.event(GameEventType.EnterLevel);
	}
}
//激活启动类
new Main();
