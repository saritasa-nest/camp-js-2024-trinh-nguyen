
/** Mapper type helps convert from Dto to Domain Model. */
export type MapperFromDto<TDto, TDomain> = {

	/**
	 * Maps from DTO to model.
	 */
	fromDto(dto: TDto): TDomain;
};

/** Mapper type helps convert from Model to Dto. */
export type MapperToDto<TDto, TDomain> = {

	/**
	 * Maps from DTO to model.
	 * @param dto DTO.
	 */
	toDto(data: TDomain): TDto;
};

/** Combine mapper type helps convert from Dto to Model and Mapper type helps convert from Model to Dto.  */
export type Mapper<TDto, TDomain> = MapperFromDto<TDto, TDomain> & MapperToDto<TDto, TDomain>;

/** Mapper function map Dto to Model. */
export type MapperFunction<TDto, TDomain> = (dto: TDto) => TDomain;
