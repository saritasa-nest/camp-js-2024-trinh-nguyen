import { Injectable } from '@angular/core';

import { BaseFilterParamsDto } from '../dtos/base-filter-params.dto';
import { BaseFilterParams } from '../models/base-filter-params';

/** Mapper for filter params. */
@Injectable({ providedIn: 'root' })
export class BaseFilterParamsMapper {

	/** @inheritdoc */
	public mapPaginationOptionsToDto(model: BaseFilterParams.Pagination): BaseFilterParamsDto.Pagination {
		return {
			offset: (model.pageNumber && model.pageSize) ? model.pageNumber * model.pageSize : undefined,
			limit: model.pageSize ?? undefined,
		};
	}

	/** @inheritdoc */
	public mapSearchOptionsToDto(model: BaseFilterParams.Search): BaseFilterParamsDto.Search {
		return {
			search: model.search ?? undefined,
		};
	}

	/** @inheritdoc */
	public mapCombinedOptionsToDto(model: BaseFilterParams.Combined): BaseFilterParamsDto.Combined {
		return {
			...this.mapPaginationOptionsToDto(model),
			...this.mapSearchOptionsToDto(model),
		};
	}

}
