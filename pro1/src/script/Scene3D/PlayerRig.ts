export class PlayerRig extends Laya.Script3D {
    constructor() { super(); }
    private _animator: Laya.Animator;
    private _charactorController: Laya.CharacterController;
    private _speedVec3: Laya.Vector3;
    onAwake() {

    }
    onEnable() {

    }
    onStart() {
        this._speedVec3 = new Laya.Vector3(0, 0, 1);
        this._animator = this.owner.getComponent(Laya.Animator) as Laya.Animator;
        // this._animator.pla
        this._charactorController = this.owner.getChildAt(0).getComponent(Laya.CharacterController) as Laya.CharacterController;
    }
    onDisable() {

    }
    onUpdate() {
        this._speedVec3.z *= Laya.timer.delta;
        this._charactorController.move(this._speedVec3);
    }
}