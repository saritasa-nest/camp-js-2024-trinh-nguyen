import { Pagination } from '../models/pagination.dto';
import { ResponseWithPaginationDto } from '../utils/response-with-pagination.utils';

import { IMapperFromDto, MapperFunction } from './imapper';

/**
 * Map Pagination Dto Model to Pagination Domain Model.
 * @param response Pagination Dto.
 * @param mapper Corresponding map: custom Map function or corresponding map type.
 */
export function paginationMapper<TDto, TDomain>(
	response: ResponseWithPaginationDto<TDto>,
	mapper: IMapperFromDto<TDto, TDomain> | MapperFunction<TDto, TDomain>,
): Pagination<TDomain> {
	const paginationDto = response;

	return new Pagination({
		items: response.results.map(item =>
			typeof mapper === 'function' ? mapper(item) : mapper.fromDto(item)),
		totalCount: paginationDto.count,
		hasNext: !!paginationDto.next,
		hasPrev: !!paginationDto.previous,
	});
}
