/**
 * Check an item is a HTMLElement or not.
 * @param elementToCheck Element need checking.
 */
export function isElement(elementToCheck: HTMLElement | HTMLSpanElement | null | undefined): elementToCheck is HTMLElement {
	return (
		elementToCheck !== null &&
		typeof elementToCheck === 'object' &&
		'nodeType' in elementToCheck &&
		elementToCheck.nodeType === Node.ELEMENT_NODE
	);
}
