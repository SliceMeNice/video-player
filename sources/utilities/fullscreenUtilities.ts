declare global {
	interface Document {
		fullscreenElement: Element;
		webkitFullscreenElement: Element;
		webkitIsFullScreen: boolean;
		mozFullScreen: Element;
		msFullscreenElement: Element;
	}

	interface Element {
		webkitRequestFullscreen(): Promise<void>;
	}
}

export function isFullscreen() {
	return !!(
		document.fullscreenElement || /* Standard syntax */
		document.webkitFullscreenElement || /* Chrome, Safari and Opera syntax */
		document.webkitIsFullScreen ||
		document.mozFullScreen || /* Firefox syntax */
		document.msFullscreenElement /* IE/Edge syntax */
	);
}

export function requestFullscreen(element: Element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen()
	}
	else if (el.mozRequestFullScreen)
	  el.mozRequestFullScreen()
	else if (el.msRequestFullscreen)
	  el.msRequestFullscreen()
	else if (el.querySelector && el.querySelector('video') && el.querySelector('video').webkitEnterFullScreen)
	  el.querySelector('video').webkitEnterFullScreen()
	else if (el.webkitEnterFullScreen)
	  el.webkitEnterFullScreen()

}

export function cancelFullscreen(el=document) {
	if (el.exitFullscreen)
	  el.exitFullscreen()
	else if (el.webkitCancelFullScreen)
	  el.webkitCancelFullScreen()
	else if (el.webkitExitFullscreen)
	  el.webkitExitFullscreen()
	else if (el.mozCancelFullScreen)
	  el.mozCancelFullScreen()
	else if (el.msExitFullscreen)
	  el.msExitFullscreen()

}

export function fullscreenEnabled() {
	return !!(
		document.fullscreenEnabled ||
		document.webkitFullscreenEnabled ||
		document.mozFullScreenEnabled ||
		document.msFullscreenEnabled
	);
}