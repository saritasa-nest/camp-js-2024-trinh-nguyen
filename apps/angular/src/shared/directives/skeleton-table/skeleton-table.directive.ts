/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable jsdoc/require-jsdoc */
import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';

@Directive({
	selector: '[appSkeletonLoader]',
	standalone: true,
})
export class SkeletonLoaderDirective implements OnInit, OnDestroy {
	private skeletonElement: HTMLElement | undefined;

	public constructor(private elementRef: ElementRef) { }

	public ngOnInit() {
		this.createSkeletonElement();
	}

	public ngOnDestroy() {
		this.removeSkeletonElement();
	}

	private createSkeletonElement() {
		this.skeletonElement = document.createElement('div');
		this.skeletonElement.classList.add('skeleton-loader');
		this.elementRef.nativeElement.classList.add('skeleton-loader-container');
		this.elementRef.nativeElement.appendChild(this.skeletonElement);
	}

	private removeSkeletonElement() {
		this.elementRef.nativeElement.classList.remove('skeleton-loader-container');
		this.elementRef.nativeElement.removeChild(this.skeletonElement);
	}
}
