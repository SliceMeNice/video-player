import { PlayerSource } from '../playerSource';
export declare type MimeTypeByExtension = {
    [key: string]: string[];
};
export declare function mimeTypesForUrl(source: PlayerSource, mimeTypesByExtension: MimeTypeByExtension): string[];
