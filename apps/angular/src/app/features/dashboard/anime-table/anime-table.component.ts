import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Pagination } from '@js-camp/core/models/pagination';

import { AnimeService } from '@js-camp/angular/core/services/anime.service';

import { NoEmptyPipe } from '@js-camp/core/pipes/no-empty.pipe';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeTableColumns } from '@js-camp/core/enums/animeTableColumns';
import { AnimeParams } from '@js-camp/core/models/anime-params';

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
		MatTableModule,
		MatProgressBarModule,
		MatIconModule,
		MatPaginatorModule,
		MatButtonModule,
		NoEmptyPipe,
		MatPaginatorModule,
	],
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AnimeTableComponent {

	/** Anime list. */
	protected readonly animeList$: Observable<Pagination<Anime>>;

	private readonly animeService = inject(AnimeService);

	/** Current page index. */
	protected pageIndex = PAGE_DEFAULT;

	/** Current item per page. */
	protected pageSize = ITEM_PER_PAGE;

	/**  Notify newest index page to user who subscribe it when user click next/previous page. */
	protected readonly pagination$ = new BehaviorSubject<PageEvent>({ pageSize: ITEM_PER_PAGE, pageIndex: PAGE_DEFAULT });

	/** Enum of anime fields. */
	protected readonly animeTableColumns: typeof AnimeTableColumns = AnimeTableColumns;

	public constructor() {

		this.animeList$ = this.pagination$.pipe(
			switchMap(page => this.animeService.getList(new AnimeParams({ pageSize: page.pageSize, pageIndex: page.pageIndex }))),
		);
	}

	/**
	 * Paginator navigator control.
	 * @param event Event includes custom pageSize and pageIndex that user select.
	 */
	protected onPaginatorChange(event: PageEvent): void {
		this.pagination$.next({ pageSize: event.pageSize, pageIndex: event.pageIndex });
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

	/** Displayer fields of an anime. */
	protected readonly animeTableColumnsArray = Object.values(this.animeTableColumns);

}
