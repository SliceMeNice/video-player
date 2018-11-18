declare global {
	interface Window {
		ActiveXObject: any;
	}
}

export class Browser {
	static get isEdge() {
		return /edge/i.test(navigator.userAgent);
	}

	static get isChrome() {
		return /chrome|CriOS/i.test(navigator.userAgent) && !Browser.isEdge;
	}

	static get isSafari() {
		return /safari/i.test(navigator.userAgent) && !Browser.isChrome && !Browser.isEdge;
	}

	static get isFirefox() {
		return /firefox/i.test(navigator.userAgent);
	}

	static get isLegacyIE() {
		return !!(window.ActiveXObject);
	}

	static get isIE() {
		return Browser.isLegacyIE || /trident.*rv:1\d/i.test(navigator.userAgent);
	}

	static get isIE11() {
		return /trident.*rv:11/i.test(navigator.userAgent);
	}

	static get isChromecast() {
		return Browser.isChrome && /CrKey/i.test(navigator.userAgent);
	}

	static get isMobile() {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Mobile Safari|Opera Mini/i.test(navigator.userAgent);
	}

	static get isiOS() {
		return /iPad|iPhone|iPod/i.test(navigator.userAgent);
	}

	static get isAndroid() {
		return /Android/i.test(navigator.userAgent);
	}

	static get isWindowsPhone() {
		return /Windows Phone/i.test(navigator.userAgent);
	}

	static get isWin8App() {
		return /MSAppHost/i.test(navigator.userAgent);
	}

	static get usesSafariEngine() {
		return Browser.isSafari || Browser.isiOS;
	}
}