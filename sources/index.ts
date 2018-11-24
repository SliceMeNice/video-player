import { PlayerOptions, DEFAULTS as defaultPlayerOptions } from './playerOptions';
import { PlayerSource } from './playerSource';
import { Playback } from './playback';
import { EventEmitter } from './eventEmitter';

import * as _mimeTypeUtilities from './utilities/mimeTypeUtilities';
import * as _optionUtilities from './utilities/optionUtilities';
import * as _typeUtilities from './utilities/typeUtilities';

export class Player extends EventEmitter {
	protected options: PlayerOptions;
	protected playback?: Playback;

	constructor(
		protected videoElement: HTMLVideoElement,
		options?: PlayerOptions
	) {
		super();

		this.handlePlaybackEvent = this.handlePlaybackEvent.bind(this);

		if (!videoElement || videoElement.nodeName !== 'VIDEO') {
			throw new Error('Parameter videoElement should be of type HTMLVideoElement');
		}

		this.options = _optionUtilities.extendOptions<PlayerOptions>({}, defaultPlayerOptions, options || {});

		if (this.options.sources.length) {
			this.setPlayerSource()
				.then(() => {
					if (this.options.autoPlay) {
						this.play();
					}
				})
				.catch(error => {
					console.error(error);
				});
		}
	}

	consent() {
		if (this.videoElement) {
			this.videoElement.load();
		}
	}

	load(sources: Array<PlayerSource>, autoPlay: boolean = false) {
		this.options.sources = sources;

		if (this.options.sources.length) {
			return this.setPlayerSource()
				.then(() => {
					if (autoPlay) {
						this.play();
					}
				})
				.catch(error => {
					console.error(error);
				});
		}

		return Promise.reject('No video source was provided.');
	}

	protected findSuitablePlaybackForSource(source: PlayerSource) {
		return this.options.playbacks.find(playbackClass => {
			return playbackClass.canPlay(source, this.options);
		});
	}

	protected handlePlaybackEvent(event: Event, ...eventParameters: any) {
		this.trigger(event.type, event, ...eventParameters);
	}

	protected setPlayerSource() {
		const player = this;

		this.resetPlayback();

		// find the first source that can be played by any of the possible playback engines
		const playableSource = player.options.sources.find(source => {
			const suitablePlaybackClass = this.findSuitablePlaybackForSource(source)

			if (suitablePlaybackClass) {
				player.playback = new suitablePlaybackClass(player.videoElement, player.options);
				player.playback.on('*', this.handlePlaybackEvent);
			}

			return !!player.playback;
		});

		if (playableSource && player.playback) {
			return player.playback.setSource(playableSource);
		} else if (!player.playback) {
			throw new Error('No suitable playback found.');
		}

		return Promise.resolve();
	}

	pause() {
		if (this.playback) {
			this.playback.pause();
		}
	}

	play() {
		if (this.playback) {
			this.playback.play();
		}
	}

	protected resetPlayback() {
		if (this.playback) {
			this.playback.off('*', this.handlePlaybackEvent);
			this.playback.detach();
			this.playback = undefined;
		}
	}

	destroy() {
		this.resetPlayback();
	}
}

export { Browser } from './browser';
export { EventEmitter } from './eventEmitter';
export { Options } from './options';
export { Playback } from './playback';
export { PlaybackEvents } from './playbackEvents';
export { PlayerOptions, DEFAULTS as defaultPlayerOptions } from './playerOptions';
export { PlayerSource } from './playerSource';

// playbacks
export { HTML5_VIDEO_MIMETYPES, HTML5VideoPlayback } from './playbacks/html5Video';

// services
export { AssetService } from './services/assetService';

// utilities
export namespace MimeTypeUtilities {
	export import MimeTypeByExtension = _mimeTypeUtilities.MimeTypeByExtension;
	export import mimeTypesForUrl = _mimeTypeUtilities.mimeTypesForUrl;
}

export namespace OptionUtilities {
	export import extendOptions = _optionUtilities.extendOptions;
}

export namespace TypeUtilities {
	export import isPlainObject = _typeUtilities.isPlainObject;
}