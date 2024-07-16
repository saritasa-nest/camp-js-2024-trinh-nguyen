import { Subscriber } from '../models/subscriber';

import { Publisher } from '../models/publisher';

import { PlayerTurnResult } from '../models/player-turn-result';

const WIN_SCORE = 21;

/** Player: store their dice result of each turn and win-status which notify to displayer class after each their turn and when they win. */
export class Player implements Subscriber<PlayerTurnResult> {

	private readonly diceResults: number[] = [];

	/** Win status: it turns true when player score >= 21, then it notify to display result subscribers. */
	public readonly winStatus: Publisher<boolean> = new Publisher<boolean>();

	/** The result dice array when new dice is generated will notify to display result subscribers.  */
	public readonly result: Publisher<number[]> = new Publisher<number[]>();

	// eslint-disable-next-line jsdoc/require-jsdoc
	public readonly playerIndex: number;

	public constructor(playerIndex: number) {
		this.playerIndex = playerIndex;
	}

	/** Get player's index. */
	public get index(): number {
		return this.playerIndex;
	}

	/** Get the score. */
	private get getTotalScore(): number {
		return this.diceResults.reduce((acc, result) => acc + result, 0);
	}

	/**
	 * Update the result of Player score from Dice generator.
	 * @param turnResult The result.
	 */
	public update(turnResult: PlayerTurnResult): void {
		if (turnResult.playerIndex !== this.playerIndex) {
			return;
		}
		this.diceResults.push(turnResult.diceResult);
		this.result.notify(this.diceResults);
		if (this.getTotalScore >= WIN_SCORE) {
			this.winStatus.notify(true);
		}

	}

}
