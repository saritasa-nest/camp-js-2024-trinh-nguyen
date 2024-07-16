/** Store score and index of player for each turn dice generation. */
export type PlayerTurnResult = {

	/** Index of player. */
	readonly playerIndex: number;

	/** The result of roll dice of player Index turn. */
	readonly diceResult: number;
};
