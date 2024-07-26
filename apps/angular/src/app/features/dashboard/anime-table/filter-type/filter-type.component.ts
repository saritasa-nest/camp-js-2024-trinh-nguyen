import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AnimeType } from '@js-camp/angular/core/models/anime-type';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'angular-bootstrap-md';@Component({
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
		CheckboxModule,
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
	public selectedTypes: string[] = [];

	// eslint-disable-next-line jsdoc/require-jsdoc
	public allSelected = false;

	// eslint-disable-next-line jsdoc/require-jsdoc
	public toggleAllSelection(): void {
		this.allSelected = !this.allSelected;
		if (this.allSelected) {
			this.selectedTypes = [...this.animeType];
		} else {
			this.selectedTypes = [];
		}
	}

	// eslint-disable-next-line jsdoc/require-jsdoc
	public onCheckboxChange(event: any, category: string): void {
		if (event.checked) {
			this.selectedTypes.push(category);
		} else {
			this.selectedTypes = this.selectedTypes.filter(c => c !== category);
		}
		this.allSelected = this.selectedTypes.length === this.animeType.length;
	}

	// eslint-disable-next-line jsdoc/require-jsdoc
	public clearSelection(): void {
		this.selectedTypes = [];
		this.allSelected = false;
	}

}
