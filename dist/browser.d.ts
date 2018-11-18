declare global {
    interface Window {
        ActiveXObject: any;
    }
}
export declare class Browser {
    static readonly isEdge: boolean;
    static readonly isChrome: boolean;
    static readonly isSafari: boolean;
    static readonly isFirefox: boolean;
    static readonly isLegacyIE: boolean;
    static readonly isIE: boolean;
    static readonly isIE11: boolean;
    static readonly isChromecast: boolean;
    static readonly isMobile: boolean;
    static readonly isiOS: boolean;
    static readonly isAndroid: boolean;
    static readonly isWindowsPhone: boolean;
    static readonly isWin8App: boolean;
    static readonly usesSafariEngine: boolean;
}
