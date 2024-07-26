import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'camp-search',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './search.component.html',
	styleUrl: './search.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line jsdoc/require-jsdoc
export class SearchComponent {}
