import { ActivatedRoute } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';

/**
 * Filter factory function.
 * @param activatedRoute Activated router.
 * @param mapper Mapper class.
 */
export function filtersFactory<T, M extends { fromDto(params: unknown): T; }>(
	activatedRoute: ActivatedRoute,
	mapper: M): Observable<T> {
	return activatedRoute.queryParams.pipe(
		map(params => mapper.fromDto(params)),
		shareReplay({ refCount: true, bufferSize: 1 }),
	);
}
