
/** Display result of player class. */
export abstract class ResultDisplayer {

	/** Element parent to display total score and the number of dice r. */
	protected readonly elementContainer: HTMLElement;

	/** Element parent to display total score and the number of dice r. */
	protected readonly playerIndex: number;

	public constructor(elementContainer: HTMLElement, playerIndex: number) {
		this.elementContainer = elementContainer;
		this.playerIndex = playerIndex;
	}
}
