import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AnimeType } from '@js-camp/core/models/anime-type';

@Component({
	selector: 'camp-filter-type',
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	imports: [
		CommonModule,
		MatSelectModule,
		MatCheckboxModule,
		MatButtonModule,
		MatIconModule,
		FormsModule,
	],
	templateUrl: './filter-type.component.html',
	styleUrl: './filter-type.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line jsdoc/require-jsdoc
export class FilterTypeComponent {
	// eslint-disable-next-line jsdoc/require-jsdoc
	public readonly animeType = Object.values(AnimeType);

	// eslint-disable-next-line jsdoc/require-jsdoc
	@Input() public selectedTypes: AnimeType | null = null;

	/** */
	@Output() public typeChange = new EventEmitter<AnimeType>();

	/**
	 * TODO.
	 * @param event TODO.
	 */
	protected onSelectionChange(event: MatSelectChange): void {
		if (event.value in AnimeType) {
			this.typeChange.emit(event.value);
		}
	}
}
