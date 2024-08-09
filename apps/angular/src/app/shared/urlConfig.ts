import { inject, Injectable } from '@angular/core';

import { ApiPaths } from '@js-camp/core/enums/apiPath';

import { AppConfig } from './appConfig';

/**
 * Urls used within the application.
 * Stringified for convenience, since most of the Angular's HTTP tools work with strings.
 */
@Injectable({ providedIn: 'root' })
export class AppUrlsConfig {
	private readonly appConfig = inject(AppConfig);

	private readonly baseUrl = this.appConfig.apiUrl;

	/** Anime-related routes. */
	public readonly anime = {
		list: this.toApi(ApiPaths.Anime),
	};

	/**
	 * Generate Api urls as an constant.
	 * @param args Multiple relative path.
	 */
	private toApi(...args: string[]): string {
		const relativePath = args.join('/');
		return new URL(relativePath, this.baseUrl).toString();
	}
}
