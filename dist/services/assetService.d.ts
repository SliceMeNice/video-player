import { Options } from '../options';
export declare type AssetLoadingOptions = Options & {
    async?: boolean;
    beforeLoad?: (path: string, element: HTMLLinkElement | HTMLImageElement | HTMLScriptElement) => void | boolean;
};
export declare class AssetService {
    protected static bundles: {
        [key: string]: string[];
    };
    protected static bundleResultCache: {
        [key: string]: Promise<{}[]>;
    };
    static loadBundle(bundleId: string, options?: AssetLoadingOptions): Promise<{}[]>;
    static loadFile(path: string, options?: AssetLoadingOptions): Promise<{}>;
    static loadFiles(paths: string[], options?: AssetLoadingOptions): Promise<{}[]>;
    static registerBundle(bundleId: string, paths: string[]): void;
}
