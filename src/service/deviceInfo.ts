export interface Ideviceinfo {
    screenWidth: number;
    screenHeight: number;
}

export const isMobileView = (screenWidth: number) => {
    return screenWidth <= 810;
}