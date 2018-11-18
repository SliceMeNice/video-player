export enum PlaybackEvents {
	/**
	 * Sent when playback is aborted; for example, if the media is playing and is restarted
	 * from the beginning, this event is sent.
	 */
	Abort = 'abort',

	/**
	 * Sent when enough data is available that the media can be played, at least for a couple
	 * of frames. This corresponds to the HAVE_ENOUGH_DATA readyState.
	 */
	CanPlay = 'canplay',

	/**
	 * Sent when the ready state changes to CAN_PLAY_THROUGH, indicating that the entire media
	 * can be played without interruption, assuming the download rate remains at least at the
	 * current level. It will also be fired when playback is toggled between paused and playing.
	 * Note: Manually setting the currentTime will eventually fire a canplaythrough event in
	 * firefox. Other browsers might not fire this event.
	 */
	CanPlayThrough = 'canplaythrough',

	/**
	 * The metadata has loaded or changed, indicating a change in duration of the media.
	 * This is sent, for example, when the media has loaded enough that the duration is known.
	 */
	DurationChange = 'durationchange',

	/**
	 * The media has become empty; for example, this event is sent if the media has already been
	 * loaded (or partially loaded), and the load() method is called to reload it.
	 */
	Emptied = 'emptied',

	/**
	 * Sent when playback completes.
	 */
	Ended = 'ended',

	/**
	 * Sent when an error occurs.  The element's error attribute contains more information.
	 * See HTMLMediaElement.error for details.
	 */
	Error = 'error',

	/**
	 * The first frame of the media has finished loading.
	 */
	LoadedData = 'loadeddata',

	/**
	 * The media's metadata has finished loading; all attributes now contain as much useful
	 * information as they're going to.
	 */
	LoadedMetadata = 'loadedmetadata',

	/**
	 * Sent when loading of the media begins.
	 */
	LoadStart = 'loadstart',

	/**
	 * Sent when the playback state is changed to paused (paused property is true).
	 */
	Pause = 'pause',

	/**
	 * Sent when the playback state is no longer paused, as a result of the play method,
	 * or the autoplay attribute.
	 */
	Play = 'play',

	/**
	 * Sent when the media has enough data to start playing, after the play event, but also when
	 * recovering from being stalled, when looping media restarts, and after seeked, if it was
	 * playing before seeking.
	 */
	Playing = 'playing',

	/**
	 * Sent periodically to inform interested parties of progress downloading the media.
	 * Information about the current amount of the media that has been downloaded is available
	 * in the media element's buffered attribute.
	 */
	Progress = 'progress',

	/**
	 * Sent when the playback speed changes.
	 */
	RateChange = 'ratechange',

	/**
	 * Sent when a seek operation completes.
	 */
	Seeked = 'seeked',

	/**
	 * Sent when a seek operation begins.
	 */
	Seeking = 'seeking',

	/**
	 * Sent when the user agent is trying to fetch media data, but data is unexpectedly not forthcoming.
	 */
	Stalled = 'stalled',

	/**
	 * Sent when loading of the media is suspended; this may happen either because the download has
	 * completed or because it has been paused for any other reason.
	 */
	Suspend = 'suspend',

	/**
	 * The time indicated by the element's currentTime attribute has changed.
	 */
	TimeUpdate = 'timeupdate',

	/**
	 * Sent when the audio volume changes (both when the volume is set and when the muted attribute is changed).
	 */
	VolumeChange = 'volumechange',

	/**
	 * Sent when the requested operation (such as playback) is delayed pending the completion of
	 * another operation (such as a seek).
	 */
	Waiting = 'waiting'
};