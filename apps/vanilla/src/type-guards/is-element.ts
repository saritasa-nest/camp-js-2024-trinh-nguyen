/**
 * Check an item is a HTMLElement or not.
 * @param element Element need checking.
 */
export function isElement(element: HTMLElement | unknown): element is HTMLElement {
	return element instanceof HTMLElement;
}
