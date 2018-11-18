import { PlayerOptions } from './playerOptions';
import { PlayerSource } from './playerSource';
import { Playback } from './playback';
import { EventEmitter } from './eventEmitter';
import * as _loadjs from 'loadjs';
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
export { HTML5_VIDEO_MIMETYPES, HTML5VideoPlayback } from './playbacks/html5Video';
export { Browser } from './browser';
export { Playback } from './playback';
export { PlaybackEvents } from './playbackEvents';
export declare const loadjs: typeof _loadjs;
