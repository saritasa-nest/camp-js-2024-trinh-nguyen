import { Publisher } from '../models/publisher';

/** Class turn generator. */
export class TurnGenerator extends Publisher<number> {

	private _currentPlayerIndex: number;

	public constructor(private readonly playersCount: number) {
		super();
		this._currentPlayerIndex = 0;
	}

	/** Get the current Index of player. */
	public get currentPlayerIndex(): number {
		return this._currentPlayerIndex;
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
		this._currentPlayerIndex = (this._currentPlayerIndex + 1) % this.playersCount;
	}
}
