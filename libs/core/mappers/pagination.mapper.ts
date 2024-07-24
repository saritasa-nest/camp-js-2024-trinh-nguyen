import { Injectable } from '@angular/core';

import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagination.dto';

import { IMapperFromDto, MapperFunction } from './imapper';

/**
 * Map Pagination Dto Model to Pagination Domain Model.
 * @param response Pagination Dto.
 * @param mapper Corresponding map: custom Map function or corresponding map type.
 */

/** Pagination mapper. */
@Injectable({
	providedIn: 'root',
})
export class PaginationMapper {

	/**
	 * Map pagination from dto to model.
	 * @param paginationDto Pagination dto need mapping to pagination model.
	 * @param mapper Function helps mapping.
	 */
	public mapPaginationFromDto<TDto, TDomain>(
		paginationDto: PaginationDto<TDto>,
		mapper: IMapperFromDto<TDto, TDomain> | MapperFunction<TDto, TDomain>,
	): Pagination<TDomain> {

		const mapperFn = typeof mapper === 'function' ? mapper : mapper.fromDto;
		return new Pagination<TDomain>({
			totalCount: paginationDto.count,
			hasNext: Boolean(paginationDto.next),
			hasPrev: Boolean(paginationDto.previous),
			items: paginationDto.results.map(item => mapperFn(item)),
		});
	}
}
