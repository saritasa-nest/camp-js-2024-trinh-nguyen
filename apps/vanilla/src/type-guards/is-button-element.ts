/**
 * Check an item is button element or not.
 * @param element Element need checking.
 */
export function isButtonElement(element: HTMLElement | null): element is HTMLButtonElement {
	return element instanceof HTMLButtonElement;
}
