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

var PlaybackEvents;
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
})(PlaybackEvents || (PlaybackEvents = {}));

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
    };
    Playback.prototype.detach = function () {
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

var _mimeTypeUtilities = /*#__PURE__*/Object.freeze({
    mimeTypesForUrl: mimeTypesForUrl
});

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

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var loadjs_umd = createCommonjsModule(function (module, exports) {
(function(root, factory) {
  {
    module.exports = factory();
  }
}(commonjsGlobal, function() {
/**
 * Global dependencies.
 * @global {Object} document - DOM
 */

var devnull = function() {},
    bundleIdCache = {},
    bundleResultCache = {},
    bundleCallbackQueue = {};


/**
 * Subscribe to bundle load event.
 * @param {string[]} bundleIds - Bundle ids
 * @param {Function} callbackFn - The callback function
 */
function subscribe(bundleIds, callbackFn) {
  // listify
  bundleIds = bundleIds.push ? bundleIds : [bundleIds];

  var depsNotFound = [],
      i = bundleIds.length,
      numWaiting = i,
      fn,
      bundleId,
      r,
      q;

  // define callback function
  fn = function (bundleId, pathsNotFound) {
    if (pathsNotFound.length) depsNotFound.push(bundleId);

    numWaiting--;
    if (!numWaiting) callbackFn(depsNotFound);
  };

  // register callback
  while (i--) {
    bundleId = bundleIds[i];

    // execute callback if in result cache
    r = bundleResultCache[bundleId];
    if (r) {
      fn(bundleId, r);
      continue;
    }

    // add to callback queue
    q = bundleCallbackQueue[bundleId] = bundleCallbackQueue[bundleId] || [];
    q.push(fn);
  }
}


/**
 * Publish bundle load event.
 * @param {string} bundleId - Bundle id
 * @param {string[]} pathsNotFound - List of files not found
 */
function publish(bundleId, pathsNotFound) {
  // exit if id isn't defined
  if (!bundleId) return;

  var q = bundleCallbackQueue[bundleId];

  // cache result
  bundleResultCache[bundleId] = pathsNotFound;

  // exit if queue is empty
  if (!q) return;

  // empty callback queue
  while (q.length) {
    q[0](bundleId, pathsNotFound);
    q.splice(0, 1);
  }
}


/**
 * Execute callbacks.
 * @param {Object or Function} args - The callback args
 * @param {string[]} depsNotFound - List of dependencies not found
 */
function executeCallbacks(args, depsNotFound) {
  // accept function as argument
  if (args.call) args = {success: args};

  // success and error callbacks
  if (depsNotFound.length) (args.error || devnull)(depsNotFound);
  else (args.success || devnull)(args);
}


/**
 * Load individual file.
 * @param {string} path - The file path
 * @param {Function} callbackFn - The callback function
 */
function loadFile(path, callbackFn, args, numTries) {
  var doc = document,
      async = args.async,
      maxTries = (args.numRetries || 0) + 1,
      beforeCallbackFn = args.before || devnull,
      pathStripped = path.replace(/^(css|img)!/, ''),
      isCss,
      e;

  numTries = numTries || 0;

  if (/(^css!|\.css$)/.test(path)) {
    isCss = true;

    // css
    e = doc.createElement('link');
    e.rel = 'stylesheet';
    e.href = pathStripped; //.replace(/^css!/, '');  // remove "css!" prefix
  } else if (/(^img!|\.(png|gif|jpg|svg)$)/.test(path)) {
    // image
    e = doc.createElement('img');
    e.src = pathStripped;    
  } else {
    // javascript
    e = doc.createElement('script');
    e.src = path;
    e.async = async === undefined ? true : async;
  }

  e.onload = e.onerror = e.onbeforeload = function (ev) {
    var result = ev.type[0];

    // Note: The following code isolates IE using `hideFocus` and treats empty
    // stylesheets as failures to get around lack of onerror support
    if (isCss && 'hideFocus' in e) {
      try {
        if (!e.sheet.cssText.length) result = 'e';
      } catch (x) {
        // sheets objects created from load errors don't allow access to
        // `cssText`
        result = 'e';
      }
    }

    // handle retries in case of load failure
    if (result == 'e') {
      // increment counter
      numTries += 1;

      // exit function and try again
      if (numTries < maxTries) {
        return loadFile(path, callbackFn, args, numTries);
      }
    }

    // execute callback
    callbackFn(path, result, ev.defaultPrevented);
  };

  // add to document (unless callback returns `false`)
  if (beforeCallbackFn(path, e) !== false) doc.head.appendChild(e);
}


/**
 * Load multiple files.
 * @param {string[]} paths - The file paths
 * @param {Function} callbackFn - The callback function
 */
function loadFiles(paths, callbackFn, args) {
  // listify paths
  paths = paths.push ? paths : [paths];

  var numWaiting = paths.length,
      x = numWaiting,
      pathsNotFound = [],
      fn,
      i;

  // define callback function
  fn = function(path, result, defaultPrevented) {
    // handle error
    if (result == 'e') pathsNotFound.push(path);

    // handle beforeload event. If defaultPrevented then that means the load
    // will be blocked (ex. Ghostery/ABP on Safari)
    if (result == 'b') {
      if (defaultPrevented) pathsNotFound.push(path);
      else return;
    }

    numWaiting--;
    if (!numWaiting) callbackFn(pathsNotFound);
  };

  // load scripts
  for (i=0; i < x; i++) loadFile(paths[i], fn, args);
}


/**
 * Initiate script load and register bundle.
 * @param {(string|string[])} paths - The file paths
 * @param {(string|Function)} [arg1] - The bundleId or success callback
 * @param {Function} [arg2] - The success or error callback
 * @param {Function} [arg3] - The error callback
 */
function loadjs(paths, arg1, arg2) {
  var bundleId,
      args;

  // bundleId (if string)
  if (arg1 && arg1.trim) bundleId = arg1;

  // args (default is {})
  args = (bundleId ? arg2 : arg1) || {};

  // throw error if bundle is already defined
  if (bundleId) {
    if (bundleId in bundleIdCache) {
      throw "LoadJS";
    } else {
      bundleIdCache[bundleId] = true;
    }
  }

  // load scripts
  loadFiles(paths, function (pathsNotFound) {
    // execute callbacks
    executeCallbacks(args, pathsNotFound);

    // publish bundle load event
    publish(bundleId, pathsNotFound);
  }, args);
}


/**
 * Execute callbacks when dependencies have been satisfied.
 * @param {(string|string[])} deps - List of bundle ids
 * @param {Object} args - success/error arguments
 */
loadjs.ready = function ready(deps, args) {
  // subscribe to bundle load event
  subscribe(deps, function (depsNotFound) {
    // execute callbacks
    executeCallbacks(args, depsNotFound);
  });

  return loadjs;
};


/**
 * Manually satisfy bundle dependencies.
 * @param {string} bundleId - The bundle id
 */
loadjs.done = function done(bundleId) {
  publish(bundleId, []);
};


/**
 * Reset loadjs dependencies statuses
 */
loadjs.reset = function reset() {
  bundleIdCache = {};
  bundleResultCache = {};
  bundleCallbackQueue = {};
};


/**
 * Determine if bundle has already been defined
 * @param String} bundleId - The bundle id
 */
loadjs.isDefined = function isDefined(bundleId) {
  return bundleId in bundleIdCache;
};


// export
return loadjs;

}));
});

var _loadjs = /*#__PURE__*/Object.freeze({
    default: loadjs_umd,
    __moduleExports: loadjs_umd
});

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

var _typeUtilities = /*#__PURE__*/Object.freeze({
    isPlainObject: isPlainObject
});

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

var _optionUtilities = /*#__PURE__*/Object.freeze({
    extendOptions: extendOptions
});

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
var loadjs = _loadjs;
var MimeTypeUtilities = _mimeTypeUtilities;
var OptionUtilities = _optionUtilities;
var TypeUtilities = _typeUtilities;

export { Player, loadjs, MimeTypeUtilities, OptionUtilities, TypeUtilities, HTML5_VIDEO_MIMETYPES, HTML5VideoPlayback, Browser, Playback, PlaybackEvents };
