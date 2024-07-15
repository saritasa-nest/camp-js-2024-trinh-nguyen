/** Store score and index of player for each turn dice generation. */
export type PlayerTurnResult = {
	// eslint-disable-next-line jsdoc/require-jsdoc
	readonly playerIndex: number;
	// eslint-disable-next-line jsdoc/require-jsdoc
	readonly diceResult: number;
};
