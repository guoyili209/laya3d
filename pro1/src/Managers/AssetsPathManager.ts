export class AssetsPathManager {
    constructor() { }
    private static levelAssetPathArr: Array<{ url: string }> = [
        { url: "res/Asset3D/Conventional/level1.ls" },
        { url: "res/Asset3D/Conventional/level2.ls" }
    ];
    public static Assets3dPath(): Array<{ url: string }> {
        return AssetsPathManager.levelAssetPathArr;
    }
    public static GetLevelAssetsPath(levelNu: number): { url: string } {
        return AssetsPathManager.levelAssetPathArr[levelNu - 1];
    }
}