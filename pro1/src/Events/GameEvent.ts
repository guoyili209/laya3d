import EventDispatcher = Laya.EventDispatcher;
export class GameEvent {
    public static eventDispatcher: EventDispatcher = new EventDispatcher;
}

export class GameEventType {
    static EnterLevel: string = "enter_level";
    static StartGame: string = "start_game";
    static GameOver: string = "game_over";
    static OpenGate: string = "open_gate";
    static OpenChest: string = "open_chest";
}