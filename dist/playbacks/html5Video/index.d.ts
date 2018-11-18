import { Playback } from "../../playback";
import { PlayerOptions } from "../../playerOptions";
import { PlayerSource } from "../../playerSource";
import { MimeTypeByExtension } from "../../utilities/mimeTypeUtilities";
export declare const HTML5_VIDEO_MIMETYPES: MimeTypeByExtension;
export declare class HTML5VideoPlayback extends Playback {
    static canPlay(source: PlayerSource, options?: PlayerOptions): boolean;
}
