import { Options } from './options';
import { Playback } from './playback';
import { HTML5VideoPlayback } from './playbacks/html5Video/index';
import { PlayerSource } from './playerSource';

export interface PlayerOptions extends Options {
	assetBaseUrls: { [key: string]: string };
	autoPlay: boolean;
	playbacks: Array<typeof Playback>;
	sources: Array<PlayerSource>;
}

export const DEFAULTS = {
	assetBaseUrls: {
		player: ''
	},
	autoPlay: false,
	playbacks: [HTML5VideoPlayback],
	sources: []
};