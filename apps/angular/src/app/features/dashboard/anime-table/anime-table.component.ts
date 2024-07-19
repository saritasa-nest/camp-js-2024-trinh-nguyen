import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TAnime } from '@js-camp/angular/core/models/anime';
import { Observable } from 'rxjs';
import { Pagination } from '@js-camp/core/models/pagination.dto';

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
	],
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {
	/** Anime data list. */
	@Input() public animeResponse$!: Observable<Pagination<TAnime>>;

	// eslint-disable-next-line jsdoc/require-jsdoc
	@Input() public nextPage!: () => void;

	// eslint-disable-next-line jsdoc/require-jsdoc
	@Input() public prevPage!: () => void;

	/** Displayer fields of an anime. */
	protected readonly fieldsTable: string[] = ['image', 'title_eng', 'title_jpn', 'aired.start', 'type', 'status'];

	// eslint-disable-next-line jsdoc/require-jsdoc
}
