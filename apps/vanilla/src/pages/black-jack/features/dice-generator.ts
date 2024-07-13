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
	 * Notify when a dice turn is generated.
	 * @param diceResult Turn and dice result.
	 **/
	public override notify(diceResult: PlayerTurnResult): void {
		this.getSubcribers()[diceResult.playerIndex].update(diceResult);
	}

	/**
	 * Generate dice when roll dice button is clicked.
	 * @param playerIndex Player this index need roll dice.
	 */
	private roll(playerIndex: number): PlayerTurnResult {
		const diceResult = getRandomIntegerNumber(this.sidesCount);
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
