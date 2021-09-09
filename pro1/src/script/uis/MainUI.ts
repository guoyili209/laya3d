import { PlayerManager } from "../../Managers/PlayerManager";
import { SceneManager } from "../../Managers/SceneManager";
import MainCamera from "../Scene3D/MainCamera";
import Movement from "../Scene3D/Movement";
import { ui } from "../../ui/layaMaxUI";
import Sprite3D = Laya.Sprite3D;
import { AssetsPathManager } from "../../Managers/AssetsPathManager";
import { GameDataManager } from "../../Managers/GameDataManager";
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class MainUI extends ui.MainUI {
    constructor() {
        super();
        this.startBtn.alpha = 0;
        //添加3D场景
        // var scene: Laya.Scene3D = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;
        //添加照相机
        // var camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        // camera.transform.translate(new Laya.Vector3(0, 3, 3));
        // camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        // camera.addComponent(MainCamera);


        // Laya.Sprite3D.load("res/Asset3D/Conventional/level_test.lh", Laya.Handler.create(this, function (sp) {
        // scene.addChild(sp);
        // let cameraSpawnPt: Sprite3D = sp.getChildByName("CameraSpawn") as Sprite3D;
        // camera.transform.position = cameraSpawnPt.transform.position;
        // }));

        //添加方向光
        // var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        // directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        // directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

        //添加自定义模型
        // var box: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1))) as Laya.MeshSprite3D;
        // box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        // var material: Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
        // material.albedoTexture = Laya.loader.getRes("res/layabox.png");
        // Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function(tex:Laya.Texture2D) {

        // }));
        // box.meshRenderer.material = material;
        // box.addComponent(Movement);

        // let scenemMgr: SceneManager = scene.addComponent(SceneManager);
        // scenemMgr.player = box;

        // Laya.Vector3.subtract(camera.transform.position, box.transform.position, mainCamera.direction);
    }

    public InitScene(): Laya.Scene3D {
        let levelAssetPathObj: { url: string } = AssetsPathManager.GetLevelAssetsPath(GameDataManager.Instance.curLevelNu);
        let levelScene3d: Laya.Scene3D = Laya.loader.getRes(levelAssetPathObj.url);
        this.addChild(levelScene3d);
        return levelScene3d;
    }
}