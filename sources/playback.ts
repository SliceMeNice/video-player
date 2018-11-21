import { PlayerOptions } from "./playerOptions";
import { PlayerSource } from "./playerSource";
import { EventEmitter } from './eventEmitter';
import { PlaybackEvents } from './playbackEvents';

export class Playback extends EventEmitter implements EventListenerObject {
	constructor(
		protected videoElement: HTMLVideoElement,
		protected playerOptions: PlayerOptions
	) {
		super();
	}

	static canPlay(source: PlayerSource, options?: PlayerOptions) {
		return false;
	};

	attach(): Promise<void> {
		this.videoElement.addEventListener(PlaybackEvents.Abort, this, false);
		this.videoElement.addEventListener(PlaybackEvents.CanPlay, this, false);
		this.videoElement.addEventListener(PlaybackEvents.CanPlayThrough, this, false);
		this.videoElement.addEventListener(PlaybackEvents.DurationChange, this, false);
		this.videoElement.addEventListener(PlaybackEvents.Emptied, this, false);
		this.videoElement.addEventListener(PlaybackEvents.Ended, this, false);
		this.videoElement.addEventListener(PlaybackEvents.Error, this, false);
		this.videoElement.addEventListener(PlaybackEvents.LoadedData, this, false);
		this.videoElement.addEventListener(PlaybackEvents.LoadedMetadata, this, false);
		this.videoElement.addEventListener(PlaybackEvents.LoadStart, this, false);
		this.videoElement.addEventListener(PlaybackEvents.Pause, this, false);
		this.videoElement.addEventListener(PlaybackEvents.Play, this, false);
		this.videoElement.addEventListener(PlaybackEvents.Playing, this, false);
		this.videoElement.addEventListener(PlaybackEvents.Progress, this, false);
		this.videoElement.addEventListener(PlaybackEvents.RateChange, this, false);
		this.videoElement.addEventListener(PlaybackEvents.Seeked, this, false);
		this.videoElement.addEventListener(PlaybackEvents.Seeking, this, false);
		this.videoElement.addEventListener(PlaybackEvents.Stalled, this, false);
		this.videoElement.addEventListener(PlaybackEvents.Suspend, this, false);
		this.videoElement.addEventListener(PlaybackEvents.TimeUpdate, this, false);
		this.videoElement.addEventListener(PlaybackEvents.VolumeChange, this, false);
		this.videoElement.addEventListener(PlaybackEvents.Waiting, this, false);

		return Promise.resolve();
	}

	detach() {
		this.videoElement.removeEventListener(PlaybackEvents.Abort, this, false);
		this.videoElement.removeEventListener(PlaybackEvents.CanPlay, this, false);
		this.videoElement.removeEventListener(PlaybackEvents.CanPlayThrough, this, false);
		this.videoElement.removeEventListener(PlaybackEvents.DurationChange, this, false);
		this.videoElement.removeEventListener(PlaybackEvents.Emptied, this, false);
		this.videoElement.removeEventListener(PlaybackEvents.Ended, this, false);
		this.videoElement.removeEventListener(PlaybackEvents.Error, this, false);
		this.videoElement.removeEventListener(PlaybackEvents.LoadedData, this, false);
		this.videoElement.removeEventListener(PlaybackEvents.LoadedMetadata, this, false);
		this.videoElement.removeEventListener(PlaybackEvents.LoadStart, this, false);
		this.videoElement.removeEventListener(PlaybackEvents.Pause, this, false);
		this.videoElement.removeEventListener(PlaybackEvents.Play, this, false);
		this.videoElement.removeEventListener(PlaybackEvents.Playing, this, false);
		this.videoElement.removeEventListener(PlaybackEvents.Progress, this, false);
		this.videoElement.removeEventListener(PlaybackEvents.RateChange, this, false);
		this.videoElement.removeEventListener(PlaybackEvents.Seeked, this, false);
		this.videoElement.removeEventListener(PlaybackEvents.Seeking, this, false);
		this.videoElement.removeEventListener(PlaybackEvents.Stalled, this, false);
		this.videoElement.removeEventListener(PlaybackEvents.Suspend, this, false);
		this.videoElement.removeEventListener(PlaybackEvents.TimeUpdate, this, false);
		this.videoElement.removeEventListener(PlaybackEvents.VolumeChange, this, false);
		this.videoElement.removeEventListener(PlaybackEvents.Waiting, this, false);

		this.videoElement.pause();
		this.videoElement.src = '';
		this.videoElement.load();

		return Promise.resolve();
	}

	handleEvent(event: Event) {
		this.trigger( event.type, event );
	}

	pause() {
		this.videoElement.pause();
	}

	play() {
		this.videoElement.play();
	}

	setSource(source: PlayerSource) {
		return this.attach()
			.then(() => {
				this.videoElement.src = source;
			});
	}
}