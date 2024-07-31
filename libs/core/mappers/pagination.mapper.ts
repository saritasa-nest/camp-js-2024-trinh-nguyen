import { Injectable } from '@angular/core';

import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagination';

import { MapperFromDto, MapperFunction } from './mapper';

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
		mapper: MapperFromDto<TDto, TDomain> | MapperFunction<TDto, TDomain>,
	): Pagination<TDomain> {

		const mapperFn = typeof mapper === 'function' ? mapper : mapper.fromDto;
		return new Pagination<TDomain>({
			totalCount: paginationDto.count,
			hasNext: paginationDto.next !== null,
			hasPrev: paginationDto.previous !== null,
			items: paginationDto.results.map(item => mapperFn(item)),
		});
	}
}
