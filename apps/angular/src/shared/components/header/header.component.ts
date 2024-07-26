import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'camp-header',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line jsdoc/require-jsdoc
export class HeaderComponent {}
