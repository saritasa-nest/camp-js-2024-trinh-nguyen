/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable jsdoc/require-jsdoc */
import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { Observable, switchMap, take } from 'rxjs';
import { Pagination } from '@js-camp/core/models/pagination';

import { AnimeService } from '@js-camp/angular/core/services/anime.service';

import { NoEmptyPipe } from '@js-camp/core/pipes/no-empty.pipe';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeTableColumns } from '@js-camp/core/enums/animeTableColumns';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';

import { SkeletonModule } from 'primeng/skeleton';

import { AnimeQueryParamsService } from '@js-camp/angular/core/services/anime-query-params.service';

import { ANIME_MANAGE_PARAMS_PROVIDERS, ANIME_MANAGE_PARAMS_TOKEN } from '@js-camp/angular/core/providers/anime-manage-params.provider';

import { AnimeManageParams } from '@js-camp/core/models/anime-manage-params';
import { SortOptions } from '@js-camp/core/models/sort-options';
import { AnimeSortFields } from '@js-camp/core/models/anime-sort-fields';

// eslint-disable-next-line no-duplicate-imports
import { SortDirection } from '@js-camp/core/models/sort-options';

import { AnimeType } from '@js-camp/core/models/anime-type';

import { SearchComponent } from './search/search.component';

import { FilterTypeComponent } from './filter-type/filter-type.component';

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
	providers: [...ANIME_MANAGE_PARAMS_PROVIDERS],
})

export class AnimeTableComponent {

	protected filter$ = inject(ANIME_MANAGE_PARAMS_TOKEN);

	/** Receive observable include pagination type of Anime api. */
	protected animeListPagination$!: Observable<Pagination<Anime>>;

	private readonly animeService = inject(AnimeService);

	private readonly animeQueryParams = inject(AnimeQueryParamsService);

	/** Enum of anime fields. */
	protected readonly animeTableColumns: typeof AnimeTableColumns = AnimeTableColumns;

	@ViewChild(MatSort) public sort!: MatSort;

	public constructor() {
		this.animeListPagination$ = this.filter$.pipe(
			switchMap(page => this.getDataOnce(((page)))),
		);
	}

	public getDataOnce(animeParams: AnimeManageParams.Combined) {
		return this.animeService.requestAnime(animeParams).pipe(
			take(1),
		);
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

	/** Displayer fields of an anime. */
	protected readonly animeTableColumnsArray = Object.values(this.animeTableColumns);

	/**
	 * Paginator navigator control.
	 * @param event Event includes custom pageSize and pageIndex that user select.
	 */
	protected onPaginationChange(event: PageEvent): void {
		this.animeQueryParams.append({ pageSize: event.pageSize, pageNumber: event.pageIndex });
	}

	protected onSortChange(event: Sort) {
		const sortOption: SortOptions<AnimeSortFields> = {
			direction: event.direction as SortDirection,
			field: event.active as AnimeSortFields,
		};
		this.animeQueryParams.appendParamsAndResetPageNumber({ sortOptions: sortOption });
	}

	protected onSearch(event: string | null) {
		this.animeQueryParams.appendParamsAndResetPageNumber({ search: event });
	}

	protected onSelect(event: AnimeType | null) {
		this.animeQueryParams.appendParamsAndResetPageNumber({ type: event });
	}

}
