import { PlayerSource } from '../playerSource';

export type MimeTypeByExtension = { [key: string]: string[]; }

export function mimeTypesForUrl(source: PlayerSource, mimeTypesByExtension: MimeTypeByExtension) {
	const extension = (source.split('?')[0].match(/.*\.(.*)$/) || [])[1];
	const mimeTypes = extension && mimeTypesByExtension[extension.toLowerCase()] || [];

	return mimeTypes;
}