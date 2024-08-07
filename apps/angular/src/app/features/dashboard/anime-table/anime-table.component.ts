import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, Observable, Subject, switchMap, takeUntil, tap, throwError } from 'rxjs';
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
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { AnimeHttpParamsService } from '@js-camp/angular/core/services/anime-http-params.service';
import {MatCardModule} from '@angular/material/card';

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
		NgxSpinnerModule,
	],
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		...ANIME_MANAGE_PARAMS_PROVIDERS,
	],
})

export class AnimeTableComponent implements OnInit, OnDestroy {

	/** Filter listen all filter action changes. */
	protected readonly filter$ = inject(ANIME_MANAGE_PARAMS_TOKEN);

	/** Receive observable include pagination type of Anime api. */
	protected readonly animeListPagination$!: Observable<Pagination<Anime>>;

	private readonly animeService = inject(AnimeService);

	private readonly animeQueryParams = inject(AnimeQueryParamsService);

	private readonly httpParamService = inject(AnimeHttpParamsService);
	/** Loading subject. */
	public isLoading$ = new BehaviorSubject<boolean>(true);
	private destroy$ = new Subject<void>();

	/** Enum of anime fields. */
	protected readonly animeTableColumns: typeof AnimeTableColumns = AnimeTableColumns;

	public constructor(private spinner: NgxSpinnerService) {
		this.isLoading$.pipe(
			tap((isLoading) => {
				if (isLoading) {

					this.spinner.show();
				} else {
					this.spinner.hide();
				}
			}),
			takeUntil(this.destroy$)
		).subscribe();

		this.animeListPagination$ = this.filter$.pipe(
			tap(() => this.isLoading$.next(true)),
			debounceTime(500),
			distinctUntilChanged(),
			switchMap(page => this.animeService.requestAnime(this.httpParamService.getHttpParams(page))),
			tap(() => this.isLoading$.next(false)),
			catchError(error => {
				this.isLoading$.next(false);
				return throwError(() => error);
			})
		);
	}

	ngOnInit() {
		/** spinner starts on init */
		this.isLoading$.next(true);
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
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

	/** Fields of an anime. */
	protected readonly animeTableColumnsArray = Object.values(this.animeTableColumns);

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
		const sortOption: SortOptions<AnimeSortFields> = {
			direction: getSortDirection(event.direction),
			field: getAnimeSortField(event.active),
		};
		this.animeQueryParams.appendParamsAndResetPageNumber({ sortOptions: sortOption });
	}

	/**
	 * Search change function.
	 * @param event Event of search change.
	 */
	protected onSearchChange(event: string | null): void {
		this.animeQueryParams.appendParamsAndResetPageNumber({ search: event });
	}

	/**
	 * Selec change function.
	 * @param event Event of select change.
	 */
	protected onSelectChange(event: AnimeType | null): void {
		this.animeQueryParams.appendParamsAndResetPageNumber({ type: event });
	}

}
