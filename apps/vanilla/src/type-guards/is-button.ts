/**
 * Check an element is HTMLButton or not.
 * @param element The element need checking.
 */
export function isHTMLButtonElement(element: unknown): element is HTMLButtonElement {
	return element instanceof HTMLButtonElement;
}
