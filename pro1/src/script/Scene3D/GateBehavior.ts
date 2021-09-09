import { GameEvent, GameEventType } from "../../Events/GameEvent";
import PhysicsComponent = Laya.PhysicsComponent;
export class GateBehavior extends Laya.Script3D {
    constructor() { super(); }
    public direction: string = "left";
    onAwake() {

    }
    onStart() {
        GameEvent.eventDispatcher.on(GameEventType.OpenGate, this, this._OpenGate);
    }
    private _OpenGate() {

    }
    onTriggerEnter(other: PhysicsComponent) {

    }
}