declare global {
    interface Document {
        fullscreenElement: Element;
        webkitFullscreenElement: Element;
        webkitIsFullScreen: boolean;
        mozFullScreen: Element;
        msFullscreenElement: Element;
    }
    interface Element {
        webkitRequestFullscreen(): Promise<void>;
    }
}
export declare function isFullscreen(): boolean;
export declare function requestFullscreen(element: Element): void;
export declare function cancelFullscreen(el?: Document): void;
export declare function fullscreenEnabled(): boolean;
