export class GameDataManager {
    constructor() {

    }
    private static _instance: GameDataManager;
    public static get Instance(): GameDataManager {
        if (this._instance == null) {
            this._instance = new GameDataManager();
        }
        return this._instance;
    }
    public curLevelNu: number = -1;

    public InitData() {
        this.curLevelNu = 1;
    }
}