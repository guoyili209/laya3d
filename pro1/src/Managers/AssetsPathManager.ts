export class AssetsPathManager {
    constructor() { }
    private static levelAssetPathArr: Array<string> = [
        "res/Asset3D/Conventional/level1.ls",
        "res/Asset3D/Conventional/level2.ls"
    ];
    public static Assets3dPath(): Array<string> {
        return this.levelAssetPathArr;
    }
    public static GetLevelAssetsPath(levelNu: number): string {
        console.log(levelNu);
        return this.levelAssetPathArr[levelNu - 1];
    }
}