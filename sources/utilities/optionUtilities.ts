import { Options } from '../options';
import { isPlainObject } from './typeUtilities';

export function extendOptions<T>(target: Options, ...options: Options[]) {
	options.forEach(option => {
		if (option != null) {
			// extend the base object
			for (let name in option) {
				const src = target[name];
				const copy = option[name];

				// prevent never-ending loop
				if (target === copy) {
					continue;
				}

				// recurse if we're merging plain objects or arrays
				if (copy && (isPlainObject(copy))) {

					const clone = src && isPlainObject(src) ? src : {};

					// never move original objects, clone them
					target[name] = extendOptions(clone, copy);

					// don't bring in undefined values
				} else if (copy !== undefined) {
					target[name] = copy;
				}
			}
		}
	});

	// return the modified object
	return <T>target;
};