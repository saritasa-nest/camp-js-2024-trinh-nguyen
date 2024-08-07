/* eslint-disable jsdoc/require-jsdoc */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-skeleton-rect',
	standalone: true,
	imports: [CommonModule],
	template: `<div [ngStyle]="{ width, height }" [ngClass]="className" class="skeleton-rect"></div>`,
	styles: [
		`
      .skeleton-rect {
        background: #e0e0e0;
        border-radius: 4px;
        margin: 4px 0;
      }
    `,
	],
})
export class RectComponent {
	@Input() public width: string | undefined;

	@Input() public height: string | undefined;

	@Input() public className: string | undefined;
}
