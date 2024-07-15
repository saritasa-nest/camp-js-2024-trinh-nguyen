import { isElement } from '@js-camp/vanilla/type-guards/is-element';

import { isButtonElement } from '@js-camp/vanilla/type-guards/is-button-element';

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

	const players = createPlayers(PLAYERS_NUMBER);
	players.forEach(player => {
		diceGenerator.subscribe(player);
	});

	const rollButton = document.getElementById('roll-dice');

	if (isButtonElement(rollButton)) {
		rollButton.addEventListener('click', () => {
			const currentPlayerIndex = turnGenerator.getCurrentPlayerIndex();
			turnGenerator.notify(currentPlayerIndex);
		});
	}

	/**
	 * Create player.
	 * @param numberOfPlayer The number of player.
	 */
	function createPlayers(numberOfPlayer: number): Player[] {

		const playerContainer = document.getElementById('player-container');

		return Array.from({ length: numberOfPlayer }, (_, index) => {
			const player = new Player(index);

			const playerElement = document.createElement('div');
			if (isElement(playerElement)) {
				playerElement.id = `player${index}`;
				if (isElement(playerContainer)) {
					playerContainer.appendChild(playerElement);
				}
			}
			const winnerDisplayer = new WinDisplayer(playerElement, index);
			const playerResultDisplayer = new PlayerDisplayer(playerElement, index);
			playerResultDisplayer.setupLayout();
			player.winStatus.subscribe(winnerDisplayer);
			player.result.subscribe(playerResultDisplayer);
			return player;
		});
	}

}

document.addEventListener('DOMContentLoaded', main);
