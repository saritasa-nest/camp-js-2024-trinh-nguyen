import { getRandomIntegerNumber } from '@js-camp/core/utils/get-integer-random';

import { Subscriber } from '../models/subscriber';

import { Publisher } from '../models/publisher';

import { PlayerTurnResult } from '../models/player-turn-result';

/** Dice generator. */
export class DiceGenerator extends Publisher<PlayerTurnResult> implements Subscriber<number> {
	public constructor(private readonly sidesCount: number) {
		super();
	}

	/**
	 * Generate dice when roll dice button is clicked.
	 * @param playerIndex Player this index need roll dice.
	 */
	private roll(playerIndex: number): PlayerTurnResult {
		const diceResult = getRandomIntegerNumber(this.sidesCount);
		return {
			playerIndex,
			diceResult,
		};
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
