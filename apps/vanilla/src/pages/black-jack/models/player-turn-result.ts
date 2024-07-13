/** Store score and index of player for each turn dice generation. */
export class PlayerTurnResult {

	public constructor(public readonly playerIndex: number, public readonly diceResult: number) {

	}
}
