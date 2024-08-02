import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
	selector: 'camp-search',
	standalone: true,
	imports: [
		CommonModule,
		MatFormFieldModule,
		FormsModule,
		MatButtonModule,
		MatInputModule,
	],
	templateUrl: './search.component.html',
	styleUrl: './search.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line jsdoc/require-jsdoc
export class SearchComponent {

	/** */
	@Input() public search = '';

	/** */
	@Output() public readonly searchChanged = new EventEmitter<string | null>();

	/**
	 * TODO.
	 * @param event TODO.
	 */
	protected onSearchChange(event: KeyboardEvent): void {
		const searchValue = (event.target as HTMLInputElement).value;
		this.searchChanged.emit(searchValue);
	}

}
