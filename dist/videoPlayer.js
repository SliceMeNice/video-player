this.SliceMeNice = this.SliceMeNice || {};
this.SliceMeNice.VideoPlayer = (function (exports) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var EventEmitter = /** @class */ (function () {
        function EventEmitter() {
            this.eventListeners = {};
        }
        EventEmitter.prototype.on = function (eventName, listener, once) {
            if (once === void 0) { once = false; }
            var listeners = this.eventListeners[eventName] || [];
            listeners.push({
                callback: listener,
                once: once
            });
            this.eventListeners[eventName] = listeners;
            return this;
        };
        EventEmitter.prototype.once = function (eventName, listener) {
            return this.on(eventName, listener, true);
        };
        EventEmitter.prototype.off = function (eventName, listener) {
            if (!eventName) {
                this.eventListeners = {};
            }
            else if (!listener) {
                this.eventListeners[eventName] = [];
            }
            else {
                var listeners = this.eventListeners[eventName] || [];
                for (var i = listeners.length - 1; i >= 0; i--) {
                    if (listeners[i].callback === listener) {
                        listeners.splice(i, 1);
                    }
                }
            }
            return this;
        };
        EventEmitter.prototype.trigger = function (eventName) {
            var _this = this;
            var eventData = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                eventData[_i - 1] = arguments[_i];
            }
            var listeners = (this.eventListeners[eventName] || []).concat((this.eventListeners['*'] || []));
            var onceListeners = [];
            listeners.forEach(function (listener, index) {
                if (listener.callback) {
                    listener.callback.apply(_this, eventData);
                }
                else {
                    // if there is no callback, remove!
                    listener.once = true;
                }
                if (listener.once) {
                    onceListeners.push(index);
                }
            });
            // remove listeners marked as once
            for (var i = onceListeners.length - 1; i >= 0; i--) {
                listeners.splice(onceListeners[i], 1);
            }
            return this;
        };
        return EventEmitter;
    }());

    (function (PlaybackEvents) {
        /**
         * Sent when playback is aborted; for example, if the media is playing and is restarted
         * from the beginning, this event is sent.
         */
        PlaybackEvents["Abort"] = "abort";
        /**
         * Sent when enough data is available that the media can be played, at least for a couple
         * of frames. This corresponds to the HAVE_ENOUGH_DATA readyState.
         */
        PlaybackEvents["CanPlay"] = "canplay";
        /**
         * Sent when the ready state changes to CAN_PLAY_THROUGH, indicating that the entire media
         * can be played without interruption, assuming the download rate remains at least at the
         * current level. It will also be fired when playback is toggled between paused and playing.
         * Note: Manually setting the currentTime will eventually fire a canplaythrough event in
         * firefox. Other browsers might not fire this event.
         */
        PlaybackEvents["CanPlayThrough"] = "canplaythrough";
        /**
         * The metadata has loaded or changed, indicating a change in duration of the media.
         * This is sent, for example, when the media has loaded enough that the duration is known.
         */
        PlaybackEvents["DurationChange"] = "durationchange";
        /**
         * The media has become empty; for example, this event is sent if the media has already been
         * loaded (or partially loaded), and the load() method is called to reload it.
         */
        PlaybackEvents["Emptied"] = "emptied";
        /**
         * Sent when playback completes.
         */
        PlaybackEvents["Ended"] = "ended";
        /**
         * Sent when an error occurs.  The element's error attribute contains more information.
         * See HTMLMediaElement.error for details.
         */
        PlaybackEvents["Error"] = "error";
        /**
         * The first frame of the media has finished loading.
         */
        PlaybackEvents["LoadedData"] = "loadeddata";
        /**
         * The media's metadata has finished loading; all attributes now contain as much useful
         * information as they're going to.
         */
        PlaybackEvents["LoadedMetadata"] = "loadedmetadata";
        /**
         * Sent when loading of the media begins.
         */
        PlaybackEvents["LoadStart"] = "loadstart";
        /**
         * Sent when the playback state is changed to paused (paused property is true).
         */
        PlaybackEvents["Pause"] = "pause";
        /**
         * Sent when the playback state is no longer paused, as a result of the play method,
         * or the autoplay attribute.
         */
        PlaybackEvents["Play"] = "play";
        /**
         * Sent when the media has enough data to start playing, after the play event, but also when
         * recovering from being stalled, when looping media restarts, and after seeked, if it was
         * playing before seeking.
         */
        PlaybackEvents["Playing"] = "playing";
        /**
         * Sent periodically to inform interested parties of progress downloading the media.
         * Information about the current amount of the media that has been downloaded is available
         * in the media element's buffered attribute.
         */
        PlaybackEvents["Progress"] = "progress";
        /**
         * Sent when the playback speed changes.
         */
        PlaybackEvents["RateChange"] = "ratechange";
        /**
         * Sent when a seek operation completes.
         */
        PlaybackEvents["Seeked"] = "seeked";
        /**
         * Sent when a seek operation begins.
         */
        PlaybackEvents["Seeking"] = "seeking";
        /**
         * Sent when the user agent is trying to fetch media data, but data is unexpectedly not forthcoming.
         */
        PlaybackEvents["Stalled"] = "stalled";
        /**
         * Sent when loading of the media is suspended; this may happen either because the download has
         * completed or because it has been paused for any other reason.
         */
        PlaybackEvents["Suspend"] = "suspend";
        /**
         * The time indicated by the element's currentTime attribute has changed.
         */
        PlaybackEvents["TimeUpdate"] = "timeupdate";
        /**
         * Sent when the audio volume changes (both when the volume is set and when the muted attribute is changed).
         */
        PlaybackEvents["VolumeChange"] = "volumechange";
        /**
         * Sent when the requested operation (such as playback) is delayed pending the completion of
         * another operation (such as a seek).
         */
        PlaybackEvents["Waiting"] = "waiting";
    })(exports.PlaybackEvents || (exports.PlaybackEvents = {}));

    var Playback = /** @class */ (function (_super) {
        __extends(Playback, _super);
        function Playback(videoElement, playerOptions) {
            var _this = _super.call(this) || this;
            _this.videoElement = videoElement;
            _this.playerOptions = playerOptions;
            return _this;
        }
        Playback.canPlay = function (source, options) {
            return false;
        };
        Playback.prototype.attach = function () {
            this.videoElement.addEventListener(exports.PlaybackEvents.Abort, this, false);
            this.videoElement.addEventListener(exports.PlaybackEvents.CanPlay, this, false);
            this.videoElement.addEventListener(exports.PlaybackEvents.CanPlayThrough, this, false);
            this.videoElement.addEventListener(exports.PlaybackEvents.DurationChange, this, false);
            this.videoElement.addEventListener(exports.PlaybackEvents.Emptied, this, false);
            this.videoElement.addEventListener(exports.PlaybackEvents.Ended, this, false);
            this.videoElement.addEventListener(exports.PlaybackEvents.Error, this, false);
            this.videoElement.addEventListener(exports.PlaybackEvents.LoadedData, this, false);
            this.videoElement.addEventListener(exports.PlaybackEvents.LoadedMetadata, this, false);
            this.videoElement.addEventListener(exports.PlaybackEvents.LoadStart, this, false);
            this.videoElement.addEventListener(exports.PlaybackEvents.Pause, this, false);
            this.videoElement.addEventListener(exports.PlaybackEvents.Play, this, false);
            this.videoElement.addEventListener(exports.PlaybackEvents.Playing, this, false);
            this.videoElement.addEventListener(exports.PlaybackEvents.Progress, this, false);
            this.videoElement.addEventListener(exports.PlaybackEvents.RateChange, this, false);
            this.videoElement.addEventListener(exports.PlaybackEvents.Seeked, this, false);
            this.videoElement.addEventListener(exports.PlaybackEvents.Seeking, this, false);
            this.videoElement.addEventListener(exports.PlaybackEvents.Stalled, this, false);
            this.videoElement.addEventListener(exports.PlaybackEvents.Suspend, this, false);
            this.videoElement.addEventListener(exports.PlaybackEvents.TimeUpdate, this, false);
            this.videoElement.addEventListener(exports.PlaybackEvents.VolumeChange, this, false);
            this.videoElement.addEventListener(exports.PlaybackEvents.Waiting, this, false);
            return Promise.resolve();
        };
        Playback.prototype.detach = function () {
            this.videoElement.removeEventListener(exports.PlaybackEvents.Abort, this, false);
            this.videoElement.removeEventListener(exports.PlaybackEvents.CanPlay, this, false);
            this.videoElement.removeEventListener(exports.PlaybackEvents.CanPlayThrough, this, false);
            this.videoElement.removeEventListener(exports.PlaybackEvents.DurationChange, this, false);
            this.videoElement.removeEventListener(exports.PlaybackEvents.Emptied, this, false);
            this.videoElement.removeEventListener(exports.PlaybackEvents.Ended, this, false);
            this.videoElement.removeEventListener(exports.PlaybackEvents.Error, this, false);
            this.videoElement.removeEventListener(exports.PlaybackEvents.LoadedData, this, false);
            this.videoElement.removeEventListener(exports.PlaybackEvents.LoadedMetadata, this, false);
            this.videoElement.removeEventListener(exports.PlaybackEvents.LoadStart, this, false);
            this.videoElement.removeEventListener(exports.PlaybackEvents.Pause, this, false);
            this.videoElement.removeEventListener(exports.PlaybackEvents.Play, this, false);
            this.videoElement.removeEventListener(exports.PlaybackEvents.Playing, this, false);
            this.videoElement.removeEventListener(exports.PlaybackEvents.Progress, this, false);
            this.videoElement.removeEventListener(exports.PlaybackEvents.RateChange, this, false);
            this.videoElement.removeEventListener(exports.PlaybackEvents.Seeked, this, false);
            this.videoElement.removeEventListener(exports.PlaybackEvents.Seeking, this, false);
            this.videoElement.removeEventListener(exports.PlaybackEvents.Stalled, this, false);
            this.videoElement.removeEventListener(exports.PlaybackEvents.Suspend, this, false);
            this.videoElement.removeEventListener(exports.PlaybackEvents.TimeUpdate, this, false);
            this.videoElement.removeEventListener(exports.PlaybackEvents.VolumeChange, this, false);
            this.videoElement.removeEventListener(exports.PlaybackEvents.Waiting, this, false);
            this.videoElement.pause();
            this.videoElement.src = '';
            this.videoElement.load();
            return Promise.resolve();
        };
        Playback.prototype.handleEvent = function (event) {
            this.trigger(event.type, event);
        };
        Playback.prototype.pause = function () {
            this.videoElement.pause();
        };
        Playback.prototype.play = function () {
            this.videoElement.play();
        };
        Playback.prototype.setSource = function (source) {
            var _this = this;
            return this.attach()
                .then(function () {
                _this.videoElement.src = source;
            });
        };
        return Playback;
    }(EventEmitter));

    function mimeTypesForUrl(source, mimeTypesByExtension) {
        var extension = (source.split('?')[0].match(/.*\.(.*)$/) || [])[1];
        var mimeTypes = extension && mimeTypesByExtension[extension.toLowerCase()] || [];
        return mimeTypes;
    }

    var HTML5_VIDEO_MIMETYPES = {
        'mp4': ['avc1.42E01E', 'avc1.58A01E', 'avc1.4D401E', 'avc1.64001E', 'mp4v.20.8', 'mp4v.20.240', 'mp4a.40.2'].map(function (codec) { return 'video/mp4; codecs="' + codec + ', mp4a.40.2"'; }),
        'ogg': ['video/ogg; codecs="theora, vorbis"', 'video/ogg; codecs="dirac"', 'video/ogg; codecs="theora, speex"'],
        '3gpp': ['video/3gpp; codecs="mp4v.20.8, samr"'],
        'webm': ['video/webm; codecs="vp8, vorbis"'],
        'mkv': ['video/x-matroska; codecs="theora, vorbis"'],
        'm3u8': ['application/x-mpegurl']
    };
    HTML5_VIDEO_MIMETYPES['ogv'] = HTML5_VIDEO_MIMETYPES['ogg'];
    HTML5_VIDEO_MIMETYPES['3gp'] = HTML5_VIDEO_MIMETYPES['3gpp'];
    var HTML5VideoPlayback = /** @class */ (function (_super) {
        __extends(HTML5VideoPlayback, _super);
        function HTML5VideoPlayback() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HTML5VideoPlayback.canPlay = function (source, options) {
            var mimeTypes = mimeTypesForUrl(source, HTML5_VIDEO_MIMETYPES);
            var videoElement = document.createElement('video');
            return !!(mimeTypes.filter(function (mediaType) { return !!videoElement.canPlayType(mediaType).replace(/no/, ''); })[0]);
        };
        return HTML5VideoPlayback;
    }(Playback));

    var DEFAULTS = {
        assetBaseUrls: {
            player: ''
        },
        autoPlay: false,
        playbacks: [HTML5VideoPlayback],
        sources: []
    };

    function isPlainObject(obj) {
        // Detect obvious negatives
        // Use toString instead of jQuery.type to catch host objects
        if (!obj || obj.toString() !== '[object Object]') {
            return false;
        }
        var proto = Object.getPrototypeOf(obj);
        // Objects with no prototype (e.g., `Object.create( null )`) are plain
        if (!proto) {
            return true;
        }
        // Objects with prototype are plain if they were constructed by a global Object function
        var Ctor = proto.hasOwnProperty('constructor') && proto.constructor;
        return typeof Ctor === 'function' && Ctor.toString() === Object.toString();
    }

    function extendOptions(target) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        options.forEach(function (option) {
            if (option != null) {
                // extend the base object
                for (var name_1 in option) {
                    var src = target[name_1];
                    var copy = option[name_1];
                    // prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }
                    // recurse if we're merging plain objects or arrays
                    if (copy && (isPlainObject(copy))) {
                        var clone = src && isPlainObject(src) ? src : {};
                        // never move original objects, clone them
                        target[name_1] = extendOptions(clone, copy);
                        // don't bring in undefined values
                    }
                    else if (copy !== undefined) {
                        target[name_1] = copy;
                    }
                }
            }
        });
        // return the modified object
        return target;
    }

    var Browser = /** @class */ (function () {
        function Browser() {
        }
        Object.defineProperty(Browser, "isEdge", {
            get: function () {
                return /edge/i.test(navigator.userAgent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Browser, "isChrome", {
            get: function () {
                return /chrome|CriOS/i.test(navigator.userAgent) && !Browser.isEdge;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Browser, "isSafari", {
            get: function () {
                return /safari/i.test(navigator.userAgent) && !Browser.isChrome && !Browser.isEdge;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Browser, "isFirefox", {
            get: function () {
                return /firefox/i.test(navigator.userAgent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Browser, "isLegacyIE", {
            get: function () {
                return !!(window.ActiveXObject);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Browser, "isIE", {
            get: function () {
                return Browser.isLegacyIE || /trident.*rv:1\d/i.test(navigator.userAgent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Browser, "isIE11", {
            get: function () {
                return /trident.*rv:11/i.test(navigator.userAgent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Browser, "isChromecast", {
            get: function () {
                return Browser.isChrome && /CrKey/i.test(navigator.userAgent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Browser, "isMobile", {
            get: function () {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Mobile Safari|Opera Mini/i.test(navigator.userAgent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Browser, "isiOS", {
            get: function () {
                return /iPad|iPhone|iPod/i.test(navigator.userAgent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Browser, "isAndroid", {
            get: function () {
                return /Android/i.test(navigator.userAgent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Browser, "isWindowsPhone", {
            get: function () {
                return /Windows Phone/i.test(navigator.userAgent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Browser, "isWin8App", {
            get: function () {
                return /MSAppHost/i.test(navigator.userAgent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Browser, "usesSafariEngine", {
            get: function () {
                return Browser.isSafari || Browser.isiOS;
            },
            enumerable: true,
            configurable: true
        });
        return Browser;
    }());

    var AssetService = /** @class */ (function () {
        function AssetService() {
        }
        AssetService.loadBundle = function (bundleId, options) {
            if (!this.bundles.hasOwnProperty(bundleId)) {
                throw new Error('Bundle is not defined');
            }
            if (!this.bundleResultCache[bundleId]) {
                this.bundleResultCache[bundleId] = this.loadFiles(this.bundles[bundleId], options);
            }
            return this.bundleResultCache[bundleId];
        };
        AssetService.loadFile = function (path, options) {
            return new Promise(function (resolve, reject) {
                options = extendOptions({}, {
                    async: true,
                    beforeLoad: function () { }
                }, options || {});
                var element;
                // remove "css!" or "img!" prefix
                var pathStripped = path.replace(/^(css|img)!/, '');
                if (/(^css!|\.css$)/.test(path)) {
                    element = document.createElement('link');
                    element.rel = 'stylesheet';
                    element.href = pathStripped;
                }
                else if (/(^img!|\.(png|gif|jpg|svg)$)/.test(path)) {
                    element = document.createElement('img');
                    element.src = pathStripped;
                }
                else {
                    element = document.createElement('script');
                    element.src = path;
                    element.async = options.async;
                }
                element.addEventListener('error', function (event) {
                    reject(new Error("Failed to load asset: " + pathStripped));
                }, {
                    once: true
                });
                element.addEventListener('beforeload', function (event) {
                    if (event.defaultPrevented) {
                        reject(new Error("Failed to load asset: " + pathStripped + " (BLOCKED)"));
                    }
                }, {
                    once: true
                });
                element.addEventListener('load', function (event) {
                    resolve();
                }, {
                    once: true
                });
                // add to document (unless callback returns `false`)
                if (options.beforeLoad(path, element) !== false) {
                    document.head.appendChild(element);
                }
            });
        };
        AssetService.loadFiles = function (paths, options) {
            var _this = this;
            return Promise.all(paths.map(function (path) {
                return _this.loadFile(path, options);
            }));
        };
        AssetService.registerBundle = function (bundleId, paths) {
            if (this.bundles.hasOwnProperty(bundleId)) {
                throw new Error('Bundle is already defined');
            }
            this.bundles[bundleId] = paths;
        };
        AssetService.bundles = {};
        AssetService.bundleResultCache = {};
        return AssetService;
    }());

    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        function Player(videoElement, options) {
            var _this = _super.call(this) || this;
            _this.videoElement = videoElement;
            _this.handlePlaybackEvent = _this.handlePlaybackEvent.bind(_this);
            if (!videoElement || videoElement.nodeName !== 'VIDEO') {
                throw new Error('Parameter videoElement should be of type HTMLVideoElement');
            }
            _this.options = extendOptions({}, DEFAULTS, options || {});
            if (_this.options.sources.length) {
                _this.setPlayerSource()
                    .then(function () {
                    if (_this.options.autoPlay) {
                        _this.play();
                    }
                })
                    .catch(function (error) {
                    console.error(error);
                });
            }
            return _this;
        }
        Player.prototype.consent = function () {
            if (this.videoElement) {
                this.videoElement.load();
            }
        };
        Player.prototype.load = function (sources, autoPlay) {
            var _this = this;
            if (autoPlay === void 0) { autoPlay = false; }
            this.options.sources = sources;
            if (this.options.sources.length) {
                return this.setPlayerSource()
                    .then(function () {
                    if (autoPlay) {
                        _this.play();
                    }
                })
                    .catch(function (error) {
                    console.error(error);
                });
            }
            return Promise.reject('No video source was provided.');
        };
        Player.prototype.findSuitablePlaybackForSource = function (source) {
            var _this = this;
            return this.options.playbacks.find(function (playbackClass) {
                return playbackClass.canPlay(source, _this.options);
            });
        };
        Player.prototype.handlePlaybackEvent = function (event) {
            var eventParameters = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                eventParameters[_i - 1] = arguments[_i];
            }
            this.trigger.apply(this, [event.type, event].concat(eventParameters));
        };
        Player.prototype.setPlayerSource = function () {
            var _this = this;
            var player = this;
            this.resetPlayback();
            // find the first source that can be played by any of the possible playback engines
            var playableSource = player.options.sources.find(function (source) {
                var suitablePlaybackClass = _this.findSuitablePlaybackForSource(source);
                if (suitablePlaybackClass) {
                    player.playback = new suitablePlaybackClass(player.videoElement, player.options);
                    player.playback.on('*', _this.handlePlaybackEvent);
                }
                return !!player.playback;
            });
            if (playableSource && player.playback) {
                return player.playback.setSource(playableSource);
            }
            else if (!player.playback) {
                throw new Error('No suitable playback found.');
            }
            return Promise.resolve();
        };
        Player.prototype.pause = function () {
            if (this.playback) {
                this.playback.pause();
            }
        };
        Player.prototype.play = function () {
            if (this.playback) {
                this.playback.play();
            }
        };
        Player.prototype.resetPlayback = function () {
            if (this.playback) {
                this.playback.off('*', this.handlePlaybackEvent);
                this.playback.detach();
                this.playback = undefined;
            }
        };
        Player.prototype.destroy = function () {
            this.resetPlayback();
        };
        return Player;
    }(EventEmitter));
    (function (MimeTypeUtilities) {
        MimeTypeUtilities.mimeTypesForUrl = mimeTypesForUrl;
    })(exports.MimeTypeUtilities || (exports.MimeTypeUtilities = {}));
    (function (OptionUtilities) {
        OptionUtilities.extendOptions = extendOptions;
    })(exports.OptionUtilities || (exports.OptionUtilities = {}));
    (function (TypeUtilities) {
        TypeUtilities.isPlainObject = isPlainObject;
    })(exports.TypeUtilities || (exports.TypeUtilities = {}));

    exports.Player = Player;
    exports.Browser = Browser;
    exports.EventEmitter = EventEmitter;
    exports.Playback = Playback;
    exports.defaultPlayerOptions = DEFAULTS;
    exports.HTML5_VIDEO_MIMETYPES = HTML5_VIDEO_MIMETYPES;
    exports.HTML5VideoPlayback = HTML5VideoPlayback;
    exports.AssetService = AssetService;

    return exports;

}({}));
