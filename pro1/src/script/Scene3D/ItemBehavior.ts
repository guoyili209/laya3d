import { ItemType } from "../../Managers/ItemManager";
import PhysicsComponent = Laya.PhysicsComponent;
export class ItemBehavior extends Laya.Script3D {
    constructor() { super(); }
    private type: string;
    onStart() {
        this.type = this.owner.name;
    }
    onTriggerEnter(other: PhysicsComponent) {
        if (other.owner.name == "Player") {
            if (this.type.indexOf(ItemType.angle_a_book) > -1) {
                console.log("angle a book");
            } else if (this.type.indexOf(ItemType.demon_d_skull) > -1) {
                console.log("demon d skull");
            }
        }
    }
}