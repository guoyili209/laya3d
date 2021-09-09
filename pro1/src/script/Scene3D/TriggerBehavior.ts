
import PhysicsComponent = Laya.PhysicsComponent;
export class TriggerBehavior extends Laya.Script3D {
    constructor() {
        super();
    }
    public type: TriggerType;
    onTriggerEnter(other: PhysicsComponent) {
        if (other.owner.name == "Player") {
            if (this.type == TriggerType.Gate) {

            } else if (this.type == TriggerType.AngleChest) {

            } else if (this.type == TriggerType.DemonChest) {
                
            }
        }
    }
}
export enum TriggerType {
    Gate,
    AngleChest,
    DemonChest
}