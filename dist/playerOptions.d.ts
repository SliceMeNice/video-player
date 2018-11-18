import { Options } from './options';
import { Playback } from './playback';
import { HTML5VideoPlayback } from './playbacks/html5Video/index';
import { PlayerSource } from './playerSource';
export interface PlayerOptions extends Options {
    assetBaseUrls: {
        [key: string]: string;
    };
    autoPlay: boolean;
    playbacks: Array<typeof Playback>;
    sources: Array<PlayerSource>;
}
export declare const DEFAULTS: {
    assetBaseUrls: {
        player: string;
    };
    autoPlay: boolean;
    playbacks: (typeof HTML5VideoPlayback)[];
    sources: never[];
};
