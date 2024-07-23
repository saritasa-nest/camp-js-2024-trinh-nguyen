
/**
 * Check an element is an HTMLElement or not.
 * @param element Element need checking.
 */
export function isHTMLElement(element: unknown): element is HTMLButtonElement {
	return element instanceof HTMLElement;
}
