import { inject, InjectionToken, Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { AnimeManageParams } from '@js-camp/core/models/anime-manage-params';
import { AnimeQueryParamsMapper } from '@js-camp/core/mappers/anime-query-params.mapper';

/** Anime filter params token. */
export const ANIME_MANAGE_PARAMS_TOKEN = new InjectionToken<Observable<AnimeManageParams.Combined>>(
	'Anime page filter params',
);

/** Anime filter params providers. */
export const ANIME_MANAGE_PARAMS_PROVIDERS: readonly Provider[] = [
	{
		provide: ANIME_MANAGE_PARAMS_TOKEN,
		deps: [ActivatedRoute],
		useFactory: animeFiltersFactory,
	},
];

/**
 * Factory function for Anime filter params.
 * @param activatedRoute Activated route.
 */
function animeFiltersFactory(activatedRoute: ActivatedRoute): Observable<AnimeManageParams.Combined> {
	const animeQueryParamsMapper = inject(AnimeQueryParamsMapper);

	return activatedRoute.queryParams.pipe(
		map(params => animeQueryParamsMapper.fromDto(params)),
		shareReplay({ refCount: true, bufferSize: 1 }),
	);
}
