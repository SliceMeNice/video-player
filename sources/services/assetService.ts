import { Options } from '../options';
import { extendOptions } from '../utilities/optionUtilities';

export type AssetLoadingOptions = Options & {
	async?: boolean;
	beforeLoad?: (path: string, element: HTMLLinkElement | HTMLImageElement | HTMLScriptElement) => void | boolean;
};

export class AssetService {
	protected static bundles: { [key:string]: string[] } = {};
	protected static bundleResultCache: { [key:string]: Promise<{}[]> } = {};

	static loadBundle( bundleId: string, options?: AssetLoadingOptions ) {
		if ( !this.bundles.hasOwnProperty( bundleId ) ) {
			throw new Error( 'Bundle is not defined' );
		}

		if ( !this.bundleResultCache[ bundleId ] ) {
			this.bundleResultCache[ bundleId ] = this.loadFiles( this.bundles[ bundleId ], options );
		}

		return this.bundleResultCache[ bundleId ];
	}

	static loadFile(path: string, options?: AssetLoadingOptions) {
		return new Promise( (resolve, reject) => {
			options = extendOptions<AssetLoadingOptions>({}, {
				async: true,
				beforeLoad: function() {}
			}, options || {});

			let element: HTMLLinkElement | HTMLImageElement | HTMLScriptElement;

			// remove "css!" or "img!" prefix
			const pathStripped = path.replace(/^(css|img)!/, '');

			if (/(^css!|\.css$)/.test(path)) {
				element = document.createElement('link');
				element.rel = 'stylesheet';
				element.href = pathStripped;
			} else if (/(^img!|\.(png|gif|jpg|svg)$)/.test(path)) {
				element = document.createElement('img');
				element.src = pathStripped;
			} else {
				element = document.createElement<'script'>('script');
				element.src = path;
				element.async = options.async!;
			}

			element.addEventListener(
				'error',
				(event:Event) => {
					reject(new Error(`Failed to load asset: ${ pathStripped }`));
				},
				{
					once: true
				}
			);

			element.addEventListener(
				'beforeload',
				(event:Event) => {
					if ( event.defaultPrevented ) {
						reject(new Error(`Failed to load asset: ${ pathStripped } (BLOCKED)`));
					}
				},
				{
					once: true
				}
			);

			element.addEventListener(
				'load',
				(event:Event) => {
					resolve();
				},
				{
					once: true
				}
			);

			// add to document (unless callback returns `false`)
  			if (options.beforeLoad!(path, element) !== false) {
				document.head!.appendChild(element);
			};
		});
	}

	static loadFiles(paths: string[], options?: AssetLoadingOptions) {
		return Promise.all(paths.map(path => {
			return this.loadFile(path, options);
		}));
	}

	static registerBundle( bundleId: string, paths: string[] ) {
		if ( this.bundles.hasOwnProperty( bundleId ) ) {
			throw new Error( 'Bundle is already defined' );
		}

		this.bundles[ bundleId ] = paths;
	}
}