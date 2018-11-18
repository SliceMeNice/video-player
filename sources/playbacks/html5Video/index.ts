import { Playback } from "../../playback";
import { PlayerOptions } from "../../playerOptions";
import { PlayerSource } from "../../playerSource";
import { mimeTypesForUrl, MimeTypeByExtension } from "../../utilities/mimeTypeUtilities";

export const HTML5_VIDEO_MIMETYPES: MimeTypeByExtension = {
	'mp4': ['avc1.42E01E', 'avc1.58A01E', 'avc1.4D401E', 'avc1.64001E', 'mp4v.20.8', 'mp4v.20.240', 'mp4a.40.2'].map(
		(codec) => { return 'video/mp4; codecs="' + codec + ', mp4a.40.2"' }),
	'ogg': ['video/ogg; codecs="theora, vorbis"', 'video/ogg; codecs="dirac"', 'video/ogg; codecs="theora, speex"'],
	'3gpp': ['video/3gpp; codecs="mp4v.20.8, samr"'],
	'webm': ['video/webm; codecs="vp8, vorbis"'],
	'mkv': ['video/x-matroska; codecs="theora, vorbis"'],
	'm3u8': ['application/x-mpegurl']
};

HTML5_VIDEO_MIMETYPES['ogv'] = HTML5_VIDEO_MIMETYPES['ogg'];
HTML5_VIDEO_MIMETYPES['3gp'] = HTML5_VIDEO_MIMETYPES['3gpp'];

export class HTML5VideoPlayback extends Playback {
	static canPlay(source: PlayerSource, options?: PlayerOptions) {
		const mimeTypes = mimeTypesForUrl(source, HTML5_VIDEO_MIMETYPES);
		const videoElement = document.createElement('video');

		return !!(mimeTypes.filter(mediaType => !!videoElement.canPlayType(mediaType).replace(/no/, ''))[0]);
	}
}