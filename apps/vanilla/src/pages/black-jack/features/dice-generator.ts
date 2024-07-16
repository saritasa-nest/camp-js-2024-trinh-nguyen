import { getRandomIntegerNumber } from '@js-camp/core/utils/get-integer-random';

import { isPlayer } from '@js-camp/vanilla/type-guards/is-player';

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
	 * @param playerTurnResult Turn and dice result of player.
	 **/
	public override notify(playerTurnResult: PlayerTurnResult): void {
		const currentPlayer = this.subscriberArr
			.filter(isPlayer)
			.find(player => player.index === playerTurnResult.playerIndex);
		if (currentPlayer) {
			currentPlayer.update(playerTurnResult);
		}
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
