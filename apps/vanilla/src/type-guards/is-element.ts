/**
 * Check an item is a HTMLElement or not.
 * @param element Element need checking.
 */
export function isElement(element: unknown): element is HTMLElement {
	return element instanceof HTMLElement;
}
