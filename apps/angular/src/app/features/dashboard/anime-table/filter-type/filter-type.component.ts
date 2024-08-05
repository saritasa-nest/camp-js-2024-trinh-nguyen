import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AnimeType } from '@js-camp/core/models/anime-type';

/** Filter type component. */
@Component({
	selector: 'camp-filter-type',
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	imports: [
		CommonModule,
		MatSelectModule,
		MatCheckboxModule,
		MatButtonModule,
		FormsModule,
	],
	templateUrl: './filter-type.component.html',
	styleUrl: './filter-type.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterTypeComponent {

	/** Anime type. */
	public readonly animeType = Object.values(AnimeType);

	/** Selected anime anime-type. */
	@Input() public selectedTypes: AnimeType | null = null;

	/** Type change listener. */
	@Output() public typeChange = new EventEmitter<AnimeType>();

	/**
	 * Selection change function.
	 * @param event Event of selection change.
	 */
	protected onSelectionChange(event: MatSelectChange): void {
		if (event.value) {
			this.typeChange.emit(event.value);
		}
	}
}
