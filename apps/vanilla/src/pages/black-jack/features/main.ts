import { isHTMLElement } from '@js-camp/vanilla/type-guards/is-element';

import { isHTMLButtonElement } from '@js-camp/vanilla/type-guards/is-button';

import { DiceGenerator } from './dice-generator';
import { Player } from './player';
import { TurnGenerator } from './turn-generator';
import { WinDisplayer } from './win-displayer';
import { PlayerDisplayer } from './player-displayer';

const DICE_SIDES = 6;
const PLAYERS_NUMBER = 6;

/** Main function. */
function main(): void {
	const turnGenerator = new TurnGenerator(PLAYERS_NUMBER);
	const diceGenerator = new DiceGenerator(DICE_SIDES);

	turnGenerator.subscribe(diceGenerator);

	createPlayers(PLAYERS_NUMBER);

	const rollButton = document.getElementById('roll-dice');

	if (isHTMLButtonElement(rollButton)) {
		rollButton.addEventListener('click', () => {
			turnGenerator.notify(turnGenerator.currentPlayerIndex);
		});
	}

	/**
	 * Create player.
	 * @param numberOfPlayer The number of player.
	 */
	function createPlayers(numberOfPlayer: number): Player[] {

		const playerContainer = document.getElementById('player-container');
		if (!isHTMLElement(playerContainer)) {
			return [];
		}
		return Array.from({ length: numberOfPlayer }, (_, index) => {
			const player = new Player(index);

			const playerElement = document.createElement('div');

			playerElement.id = `player${index}`;
			playerContainer.appendChild(playerElement);

			const winnerDisplayer = new WinDisplayer(playerElement, index);
			const playerResultDisplayer = new PlayerDisplayer(playerElement, index);
			playerResultDisplayer.setupLayout();
			diceGenerator.subscribe(player);
			player.winStatus.subscribe(winnerDisplayer);
			player.result.subscribe(playerResultDisplayer);
			return player;
		});
	}

}

document.addEventListener('DOMContentLoaded', main);
