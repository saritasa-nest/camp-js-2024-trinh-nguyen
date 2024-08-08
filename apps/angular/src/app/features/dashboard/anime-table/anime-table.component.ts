import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, catchError, debounceTime, Observable, switchMap, tap, throwError } from 'rxjs';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { NullablePipe } from '@js-camp/core/pipes/no-empty.pipe';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeTableColumns } from '@js-camp/core/enums/animeTableColumns';
import { MatSortModule, Sort } from '@angular/material/sort';
import { AnimeQueryParamsService } from '@js-camp/angular/core/services/anime-query-params.service';
import { ANIME_MANAGE_PARAMS_PROVIDERS, ANIME_MANAGE_PARAMS_TOKEN } from '@js-camp/angular/core/providers/anime-manage-params.provider';
import { getAnimeSortField, getSortDirection, SortOptions } from '@js-camp/core/models/sort-options';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { AnimeSortFields } from '@js-camp/core/models/anime-sort-fields';
import { SearchComponent } from './search/search.component';
import { FilterTypeComponent } from './filter-type/filter-type.component';
import {MatCardModule} from '@angular/material/card';
import { DEBOUNCE_TIME, PAGE_SIZE_OPTIONS } from '@js-camp/angular/core/constants/constants';
import { SkeletonCellComponent } from './skeleton-cell/skeleton-cell.component';
import { DEFAULT_PAGINATION_OPTIONS } from '@js-camp/core/constants/pagination';
/** Anime Table Component. */
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	imports: [
		CommonModule,
		MatTableModule,
		MatSortModule,
		MatIconModule,
		MatCardModule,
		MatPaginatorModule,
		MatButtonModule,
		NullablePipe,
		FilterTypeComponent,
		SearchComponent,
		MatPaginatorModule,
		SkeletonCellComponent,
		DatePipe,
	],
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		...ANIME_MANAGE_PARAMS_PROVIDERS,
	],
})

export class AnimeTableComponent {


	/** Filter listen all filter action changes. */
	protected readonly filter$ = inject(ANIME_MANAGE_PARAMS_TOKEN);

	/** Receive observable include pagination type of Anime api. */
	protected readonly animeListPagination$: Observable<Pagination<Anime>>;

	private readonly animeService = inject(AnimeService);

	private readonly animeQueryParams = inject(AnimeQueryParamsService);

	/** Loading subject. */
	protected readonly isLoading$ = new BehaviorSubject(true);

	/** Enum of anime fields. */
	protected readonly animeTableColumns = AnimeTableColumns;

	/** Fields of an anime. */
	protected readonly animeTableColumnsArray = Object.values(this.animeTableColumns);

	/** Page size options for page size selection. */
	protected readonly PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;


	private readonly DEBOUNCE_TIME = DEBOUNCE_TIME;

	public constructor() {
		this.animeListPagination$ = this.filter$.pipe(
			debounceTime(this.DEBOUNCE_TIME),
			tap(() => {
				this.isLoading$.next(true);
			}),
			switchMap(page => this.animeService.requestAnime(page)),
			tap(() =>
				{
					this.isLoading$.next(false);
				}
		),
			catchError(error => {
				this.isLoading$.next(false);
				return throwError(() => error);
			})
		);
	}


	/**
	 * Function return index of item in an array.
	 * @param index Index of item.
	 * @param item The value of item.
	 * @returns
	 */
	protected trackAnime(index: number, item: Anime): number {
		return item.id;
	}

	/**
	 * Paginator navigator control.
	 * @param event Event includes custom pageSize and pageIndex that user select.
	 */
	protected onPaginationChange(event: PageEvent): void {
		this.animeQueryParams.append({ pageSize: event.pageSize, pageNumber: event.pageIndex });
	}

	/**
	 * Sort change function.
	 * @param event Event of sort change.
	 */
	protected onSortChange(event: Sort): void {
		const sortOptions: SortOptions<AnimeSortFields> = {
			direction: getSortDirection(event.direction),
			field: getAnimeSortField(event.active),
		};
		this.animeQueryParams.appendParamsAndResetPageNumber({ sortOptions });
	}

	/**
	 * Handle search change.
	 * @param search Search.
	 */
	protected onSearchChange(search: string | null): void {
		this.animeQueryParams.appendParamsAndResetPageNumber({ search });
	}

	/**
	 * Handle select change.
	 * @param event Event of select change.
	 */
	protected onSelectChange(type: AnimeType | null): void {
		this.animeQueryParams.appendParamsAndResetPageNumber({ type });
	}

	/**
	 * Create a skeleton template for a table while loading.
	 * @param pageSize - Page size.
	 */
	protected createSkeletonAnimeSource(): any[] {
		return Array.from({ length: DEFAULT_PAGINATION_OPTIONS.pageSize }).map((_, index) => ({ id: index } ));
	}

}
