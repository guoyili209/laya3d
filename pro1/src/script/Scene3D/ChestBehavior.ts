import { GameEvent, GameEventType } from "../../Events/GameEvent";
import PhysicsComponent = Laya.PhysicsComponent;
export class ChestBehavior extends Laya.Script3D {
    constructor() {
        super();
    }
    onStart() {
        GameEvent.eventDispatcher.on(GameEventType.OpenChest, this, this._OpenChest);
    }
    private _OpenChest() {
        console.log("打开箱子");
    }

}