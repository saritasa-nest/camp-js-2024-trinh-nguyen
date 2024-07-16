import { Publisher } from '../models/publisher';

/** Class turn generator. */
export class TurnGenerator extends Publisher<number> {

	private currentPlayerIndex;

	public constructor(private readonly playersCount: number) {
		super();
		this.currentPlayerIndex = 0;
	}

	/** Get the current Index of player. */
	public getCurrentPlayerIndex(): number {
		return this.currentPlayerIndex;
	}

	/**
	 * Notify to subscriber to generate new result for current player.
	 * @param currentIndex Current turn index.
	 **/
	public override notify(currentIndex: number): void {
		this.subscribers.forEach(subscriber => {
			subscriber.update(currentIndex);
		});
		this.next();
	}

	/** Generate next player's turn. */
	private next(): void {
		this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playersCount;
	}
}
