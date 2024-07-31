/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable jsdoc/require-jsdoc */
import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { Pagination } from '@js-camp/core/models/pagination';

import { AnimeService } from '@js-camp/angular/core/services/anime.service';

import { NoEmptyPipe } from '@js-camp/core/pipes/no-empty.pipe';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeTableColumns } from '@js-camp/core/enums/animeTableColumns';
import { AnimeParams } from '@js-camp/core/models/anime-params';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';

import { SkeletonModule } from 'primeng/skeleton';

import { FilterTypeComponent } from './filter-type/filter-type.component';

import { SearchComponent } from './search/search.component';

type PageEvent = {

	/** The number of item per page. */
	pageSize: number;

	/** The current index page. */
	pageIndex: number;
};

const ITEM_PER_PAGE = 25;

const PAGE_DEFAULT = 0;

/** Anime Table Component. */
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	imports: [
		CommonModule,
		MatTableModule,
		MatSortModule,
		MatProgressBarModule,
		MatIconModule,
		MatPaginatorModule,
		MatButtonModule,
		NoEmptyPipe,
		FilterTypeComponent,
		SearchComponent,
		SkeletonModule,
		MatPaginatorModule,
	],
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AnimeTableComponent {

	/** Receive observable include pagination type of Anime api. */
	protected animeListPagination$: Observable<Pagination<Anime>>;

	private readonly animeService = inject(AnimeService);

	/** Current page index. */
	protected pageIndex = PAGE_DEFAULT;

	/** Current item per page. */
	protected pageSize = ITEM_PER_PAGE;

	/**  Notify newest index page to user who subscribe it when user click next/previous page. */
	protected readonly pageSubject$ = new BehaviorSubject<PageEvent>({ pageSize: ITEM_PER_PAGE, pageIndex: PAGE_DEFAULT });

	/** Enum of anime fields. */
	protected readonly animeTableColumns: typeof AnimeTableColumns = AnimeTableColumns;

	public sortActive: string;

	public sortDirection: 'asc' | 'desc' | '';

	@ViewChild(MatSort)
	public matSort!: MatSort;

	public constructor() {
		this.sortDirection = '';
		this.sortActive = '';

		this.animeListPagination$ = this.pageSubject$.pipe(
			switchMap(page => this.animeService.getAnime(new AnimeParams({ pageSize: page.pageSize, pageIndex: page.pageIndex }))),
		);
	}

	/**
	 * Paginator navigator control.
	 * @param event Event includes custom pageSize and pageIndex that user select.
	 */
	protected getPaginatorData(event: PageEvent): void {
		this.pageSubject$.next({ pageSize: event.pageSize, pageIndex: event.pageIndex });
	}

	/**
	 * Function return index of item in an array.
	 * @param index Index of item.
	 * @param item The value of item.
	 * @returns
	 */
	protected trackByFn(index: number, item: Anime): number {
		return item.id;
	}

	public isDataAvailable(animeListPagination: Pagination<Anime> | null): boolean {
		return animeListPagination !== null && animeListPagination.items.length > 0;
	}

	public setOrderImperatively(sort?: Sort) {
		if (sort) {
			this.sortActive = sort.active;
			this.sortDirection = sort.direction;
			return;
		}
		this.sortActive = this.sortActive === 'titleEnglish' ? 'status' : 'titleEnglish';
		this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
	}

	public sortData(sort: Sort): void {
		this.setOrderImperatively(sort);
		this.animeListPagination$ = this.animeListPagination$.pipe(
			switchMap(pagination => {
				// Sắp xếp items theo titleEnglish
				const sortedItems = [...pagination.items].sort((a, b) => {
					switch (sort?.active) {
						case 'titleEnglish':
							return compare(a.titleEnglish, b.titleEnglish, sort.direction === 'asc');
						case 'aired':
							return compare(a.aired.start.toISOString(), b.aired.start.toISOString(), sort.direction === 'asc');
						case 'status':
							return compare(a.status, b.status, sort.direction === 'asc');
						default:
							return 0;
					}
				});

				// Trả về một Observable mới với đối tượng pagination đã sắp xếp
				return of({
					hasPrev: pagination.hasPrev,
					hasNext: pagination.hasNext,
					hasItems: pagination.hasItems,
					totalCount: pagination.totalCount,
					items: sortedItems,
				});
			}),
		);
	}

	/** Displayer fields of an anime. */
	protected readonly animeTableColumnsArray = Object.values(this.animeTableColumns);

}

/**
 * Compares two values.
 * @param a First value.
 * @param b Second value.
 * @param isAsc Whether the comparison should be in ascending order.
 * @returns Comparison result.
 */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
	if (a < b) {
		return isAsc ? -1 : 1;
	}
	if (a > b) {
		return isAsc ? 1 : -1;
	}
	return 0;
}
