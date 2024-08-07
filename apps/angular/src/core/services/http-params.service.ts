/* eslint-disable jsdoc/require-jsdoc */
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Mapper } from '@js-camp/core/mappers/mapper';

/** Injection token for Mapper. */
export const MAPPER_TOKEN = new InjectionToken<Mapper<unknown, unknown>>('Mapper');

@Injectable({ providedIn: 'root' })
export class GenericHttpParamsService<TDto, TParams> {
	private readonly paramsMapper: Mapper<TDto, TParams>;

	public constructor(@Inject(MAPPER_TOKEN) mapper: Mapper<TDto, TParams>) {
		this.paramsMapper = mapper;
	}

	private buildHttpParamsFromDto(params: TDto): HttpParams {
		let httpParams = new HttpParams();

		for (const key in params) {
			if (Object.prototype.hasOwnProperty.call(params, key) && params[key] != null) {
				httpParams = httpParams.set(key, String(params[key]));
			}
		}

		return httpParams;
	}

	/**
	 * Build HttpParams from URL query params.
	 * @param params URL query params.
	 * @returns Http params.
	 */
	public getHttpParams(params: TParams): HttpParams {
		const dtoQueryParams = this.paramsMapper.toDto(params);
		return this.buildHttpParamsFromDto(dtoQueryParams);
	}
}
