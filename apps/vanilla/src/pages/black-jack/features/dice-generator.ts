import { Subscriber } from '../models/subscriber';

import { Publisher } from '../models/publisher';

import { PlayerTurnResult } from '../models/player-turn-result';

/** Dice generator. */
export class DiceGenerator extends Publisher<PlayerTurnResult> implements Subscriber<number> {
	private readonly sidesCount: number;

	public constructor(sidesCount: number) {
		super();
		this.sidesCount = sidesCount;
	}

	/**
	 * Notify when a dice turn is generated.
	 * @param diceResult Turn and dice result.
	 **/
	public override notify(diceResult: PlayerTurnResult): void {
		this.getSubcribers().forEach(subscriber => {
			if (
				this.getSubscriberIndex(subscriber) === diceResult.playerIndex
			) {
				subscriber.update(diceResult);
			}
		});
	}

	/**
	 * Generate dice when roll dice button is clicked.
	 * @param playerIndex Player this index need roll dice.
	 */
	private roll(playerIndex: number): PlayerTurnResult {
		const diceResult = Math.floor(Math.random() * this.sidesCount) + 1;
		return new PlayerTurnResult(playerIndex, diceResult);
	}

	/**
	 * Update new player turn.
	 * @param currentIndex Current index.
	 **/
	public update(currentIndex: number): void {
		const playerTurnResult = this.roll(currentIndex);
		this.notify(playerTurnResult);
	}
}
