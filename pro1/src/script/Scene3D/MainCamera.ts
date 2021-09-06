import { SceneManager } from "../../Managers/SceneManager";

export default class MainCamera extends Laya.Script3D {
    /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
    public intType: number = 1000;
    /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
    public numType: number = 1000;
    /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
    public strType: string = "hello laya";
    /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
    public boolType: boolean = true;
    // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0

    private _camera: Laya.Camera;
    private _upVec: Laya.Vector3;
    private _newPos: Laya.Vector3;
    private _newRoation: Laya.Quaternion;
    // direction: Laya.Vector3;
    rot: Laya.Quaternion;

    constructor() { super(); }
    onAwake(): void {
        this.rot = new Laya.Quaternion();
        // this.direction = new Laya.Vector3();
        this._upVec = new Laya.Vector3(0, 1, 0);
        this._camera = this.owner as Laya.Camera;
        this._newPos = new Laya.Vector3(0, 0, 0);
        this._newRoation = new Laya.Quaternion();
        // console.log(this._camera.transform.localPosition);
    }
    onEnable(): void {
    }

    onDisable(): void {
    }
    onUpdate() {
        let nu: number = Laya.timer.delta * 0.0001;
        if (SceneManager.Instance.player) {
            let pos = this._camera.transform.localPosition;
            this.rot.rotateY(nu, this.rot);
            let dir: Laya.Vector3 = new Laya.Vector3();
            Laya.Vector3.subtract(pos, SceneManager.Instance.player.transform.localPosition, dir); //计算从圆心指向摄像头的朝向向量
            Laya.Vector3.transformQuat(dir, this.rot, dir);//旋转此向量
            this._newPos.setValue(0, 0, 0);
            Laya.Vector3.add(SceneManager.Instance.player.transform.localPosition, dir, this._newPos);//移动摄像机位置
            this._camera.transform.position = this._newPos;
            // let myrot: Laya.Quaternion = this._camera.transform.localRotation;
            // Laya.Quaternion.multiply(this.rot, myrot, this._newRoation); //设置角度
            // this._camera.transform.localRotation = this._newRoation;
        }
    }
}