import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

/** Search Component. */
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
export class SearchComponent {

	/** Search input. */
	@Input() public search = '';

	/** Search change listener. */
	@Output() public readonly searchChanged = new EventEmitter<string | null>();

	/** Debound search. */
	protected searchUpdate$ = new Subject<string>();

	/**
	 * Get search value.
	 * @param event Event of search input.
	 */

	public constructor() {
		this.searchUpdate$.pipe(
			debounceTime(400),
			distinctUntilChanged(),
		)
			.subscribe(value => {
				this.searchChanged.emit(value);
			});
	}

}
