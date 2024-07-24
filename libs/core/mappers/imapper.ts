
/** Mapper type helps convert from Dto to Domain Model. */
export type IMapperFromDto<TDto, TDomain> = {

	/**
	 * Maps from DTO to Domain model.
	 */
	fromDto(dto: TDto): TDomain;
};

/** Mapper type helps convert from Domain Model to Dto Model. */
export type IMapperToDto<TDto, TDomain> = {

	/**
	 * Maps from Domain to DTO model.
	 */
	toDto(data: TDomain): TDto;
};

/** Combine mapper type helps convert from Dto to Domain Model and Mapper type helps convert from Domain Model to Dto Model.  */
export type IMapper<TDto, TDomain> = {} & IMapperFromDto<TDto, TDomain> & IMapperToDto<TDto, TDomain>;

/** Mapper function map Dto Model to Domain Model. */
export type MapperFunction<TDto, TDomain> = (dto: TDto) => TDomain;
