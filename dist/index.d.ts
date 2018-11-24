import { PlayerOptions } from './playerOptions';
import { PlayerSource } from './playerSource';
import { Playback } from './playback';
import { EventEmitter } from './eventEmitter';
import * as _mimeTypeUtilities from './utilities/mimeTypeUtilities';
import * as _optionUtilities from './utilities/optionUtilities';
import * as _typeUtilities from './utilities/typeUtilities';
export declare class Player extends EventEmitter {
    protected videoElement: HTMLVideoElement;
    protected options: PlayerOptions;
    protected playback?: Playback;
    constructor(videoElement: HTMLVideoElement, options?: PlayerOptions);
    consent(): void;
    load(sources: Array<PlayerSource>, autoPlay?: boolean): Promise<void>;
    protected findSuitablePlaybackForSource(source: PlayerSource): typeof Playback | undefined;
    protected handlePlaybackEvent(event: Event, ...eventParameters: any): void;
    protected setPlayerSource(): Promise<void>;
    pause(): void;
    play(): void;
    protected resetPlayback(): void;
    destroy(): void;
}
export { Browser } from './browser';
export { EventEmitter } from './eventEmitter';
export { Options } from './options';
export { Playback } from './playback';
export { PlaybackEvents } from './playbackEvents';
export { PlayerOptions, DEFAULTS as defaultPlayerOptions } from './playerOptions';
export { PlayerSource } from './playerSource';
export { HTML5_VIDEO_MIMETYPES, HTML5VideoPlayback } from './playbacks/html5Video';
export { AssetService } from './services/assetService';
export declare namespace MimeTypeUtilities {
    export import MimeTypeByExtension = _mimeTypeUtilities.MimeTypeByExtension;
    export import mimeTypesForUrl = _mimeTypeUtilities.mimeTypesForUrl;
}
export declare namespace OptionUtilities {
    export import extendOptions = _optionUtilities.extendOptions;
}
export declare namespace TypeUtilities {
    export import isPlainObject = _typeUtilities.isPlainObject;
}
