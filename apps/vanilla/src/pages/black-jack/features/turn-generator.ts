import { Publisher } from '../models/publisher';

/** Class Turn Generator. */
export class TurnGenerator extends Publisher<number> {
	private readonly playersCount: number;

	private currentPlayerIndex = 0;

	public constructor(playersCount: number) {
		super();
		this.playersCount = playersCount;
		this.currentPlayerIndex = 0;
	}

	/** Get the current Index of player. */
	public getCurrentPlayerIndex(): number {
		return this.currentPlayerIndex;
	}

	/**
	 * Notify to dice-generator to generate new result for current player.
	 * @param currentIndex Current turn index.
	 **/
	public override notify(currentIndex: number): void {
		this.getSubcribers().forEach(subscriber => {
			subscriber.update(currentIndex);
			this.next();

		});
	}

	/** Generate next player's turn. */
	private next(): void {
		this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playersCount;
	}
}
