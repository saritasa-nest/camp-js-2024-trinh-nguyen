import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TAnime } from '@js-camp/angular/core/models/anime';
import { BehaviorSubject, Observable, switchMap, take } from 'rxjs';
import { Pagination } from '@js-camp/core/models/pagination.dto';
import { NoEmptyPipe } from '@js-camp/angular/core/pipes/no-empty.pipe';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';

/** Anime Table Component. */
@Component({
	selector: 'camp-anime_table',
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
	],
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {

	/** Receive api response async. */
	protected animeList$: Observable<Pagination<TAnime>>;

	private readonly animeService: AnimeService = inject(AnimeService);

	// Notify newest index Page to user who subscribe it when user click next/previous page.
	private pageSubject$ = new BehaviorSubject<number>(0);

	private currentPage = 0;

	public constructor() {

		/** When next function of pageSubject$ is called, this one will run to switch from current Observale
		 * to new Observable. In this case: call new api for new page.
		 *   */
		this.animeList$ = this.pageSubject$.pipe(
			switchMap(page => this.animeService.getAnime({ pageNumber: page })),
		);
	}

	/** Load next page. */
	protected nextPage(): void {
		this.animeList$.pipe(

			// Get one current value of animeList$ and then unsubscribe.
			take(1),
		).subscribe(pagination => {
			if (pagination.hasNext) {
				// Generate next page and notify to subscriber.
				this.pageSubject$.next(this.currentPage + 1);
				this.currentPage++;
			}
		});
	}

	/** Load previous page. */
	protected prevPage(): void {
		this.animeList$.pipe(
			take(1),
		).subscribe(pagination => {
			if (pagination.hasPrev) {
				this.pageSubject$.next(this.currentPage - 1);
				this.currentPage--;
			}
		});
	}

	/** Displayer fields of an anime. */
	protected readonly fieldsTable: string[] = ['image', 'title_eng', 'title_jpn', 'aired.start', 'type', 'status'];

}
