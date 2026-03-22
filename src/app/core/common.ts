export class CommonUtil {
    public static getminHeightWidth() {
        return window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
    }
}