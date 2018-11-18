export function isPlainObject(obj: any) {
	// Detect obvious negatives
	// Use toString instead of jQuery.type to catch host objects
	if (!obj || obj.toString() !== '[object Object]') {
		return false;
	}

	const proto = Object.getPrototypeOf(obj);

	// Objects with no prototype (e.g., `Object.create( null )`) are plain
	if (!proto) {
		return true;
	}

	// Objects with prototype are plain if they were constructed by a global Object function
	const Ctor = proto.hasOwnProperty('constructor') && proto.constructor;
	return typeof Ctor === 'function' && Ctor.toString() === Object.toString();
}