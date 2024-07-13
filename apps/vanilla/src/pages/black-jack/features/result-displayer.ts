
/** Display result of player class. */
export abstract class ResultDisplayer {

	public constructor(protected readonly elementContainer: HTMLElement, protected readonly playerIndex: number) {
	}
}
