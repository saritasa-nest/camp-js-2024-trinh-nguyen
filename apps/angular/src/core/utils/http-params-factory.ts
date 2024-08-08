import { HttpParams } from '@angular/common/http';

/**
 * Build generic http params.
 * @param params Generic params.
 */
export function buildHttpParamsFromDto<T>(params: T): HttpParams {
	let httpParams = new HttpParams();

	for (const key in params) {
		if (Object.prototype.hasOwnProperty.call(params, key) && params[key] != null) {
			httpParams = httpParams.set(key, String(params[key]));
		}
	}

	return httpParams;
}
