import { PlayerOptions } from "./playerOptions";
import { PlayerSource } from "./playerSource";
import { EventEmitter } from './eventEmitter';
export declare class Playback extends EventEmitter implements EventListenerObject {
    protected videoElement: HTMLVideoElement;
    protected playerOptions: PlayerOptions;
    constructor(videoElement: HTMLVideoElement, playerOptions: PlayerOptions);
    static canPlay(source: PlayerSource, options?: PlayerOptions): boolean;
    attach(): Promise<void>;
    detach(): Promise<void>;
    handleEvent(event: Event): void;
    pause(): void;
    play(): void;
    setSource(source: PlayerSource): Promise<void>;
}
