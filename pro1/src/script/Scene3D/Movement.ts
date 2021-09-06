import MeshSprite3D = Laya.MeshSprite3D;
import Transfrom3D = Laya.Transform3D;
export default class Movement extends Laya.Script3D {
    /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
    public intType: number = 1000;
    /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
    public numType: number = 1000;
    /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
    public strType: string = "hello laya";
    /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
    public boolType: boolean = true;
    // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
    private _cube: MeshSprite3D;
    private _transform: Transfrom3D;

    constructor() { super(); }
    onAwake() {

    }
    onEnable(): void {
    }
    onStart() {
        this._cube = this.owner as MeshSprite3D;
        this._transform = this._cube.transform;
    }

    onDisable(): void {
    }
    onUpdate() {
        // this._transform.position.z += 0.1 * Laya.timer.delta;
        // this._transform.localRotationEulerY += 0.1 * Laya.timer.delta;
    }
}