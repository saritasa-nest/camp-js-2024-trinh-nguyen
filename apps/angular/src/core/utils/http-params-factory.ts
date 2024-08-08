/* eslint-disable jsdoc/require-jsdoc */
import { HttpParams } from '@angular/common/http';

export function buildHttpParamsFromDto<T>(params: T): HttpParams {
	let httpParams = new HttpParams();

	for (const key in params) {
		if (Object.prototype.hasOwnProperty.call(params, key) && params[key] != null) {
			httpParams = httpParams.set(key, String(params[key]));
		}
	}

	return httpParams;
}
