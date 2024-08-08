import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, finalize, Observable, Subject, switchMap, takeUntil, tap, throwError } from 'rxjs';
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
import {MatCardModule} from '@angular/material/card';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { PAGE_SIZE_OPTIONS } from '@js-camp/angular/core/constants/constants';
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

export class AnimeTableComponent implements OnInit {

	protected readonly destroyRef = inject(DestroyRef);

	/** Filter listen all filter action changes. */
	protected readonly filter$ = inject(ANIME_MANAGE_PARAMS_TOKEN);

	/** Receive observable include pagination type of Anime api. */
	protected readonly animeListPagination$: Observable<Pagination<Anime>>;

	private readonly animeService = inject(AnimeService);

	private readonly animeQueryParams = inject(AnimeQueryParamsService);

	/** Loading subject. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Enum of anime fields. */
	protected readonly animeTableColumns = AnimeTableColumns;

	/** Fields of an anime. */
	protected readonly animeTableColumnsArray = Object.values(this.animeTableColumns);
	protected readonly PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

	// TODO (Trinh Nguyen): Use inject.
	public constructor(private spinner: NgxSpinnerService) {
		this.animeListPagination$ = this.filter$.pipe(
			debounceTime(500),
			tap(() => {
				this.isLoading$.next(true);
			}),
			switchMap(page => this.animeService.requestAnime(page)),
			tap(() => this.isLoading$.next(false)),
			catchError(error => {
				this.isLoading$.next(false);
				return throwError(() => error);
			})
		);
	}

	ngOnInit() {
		// TODO (Trinh Nguyen): Create a component to reduce this boilerplate code.
		this.isLoading$.pipe(
			tap((isLoading) => {
				if (isLoading) {
					this.spinner.show();
				} else {
					this.spinner.hide();
				}
			}),
			takeUntilDestroyed(this.destroyRef)
		).subscribe();
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

}
