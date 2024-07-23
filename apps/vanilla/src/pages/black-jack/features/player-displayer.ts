import { isHTMLElement } from '@js-camp/vanilla/type-guards/is-element';

import { Subscriber } from '../models/subscriber';

import { ResultDisplayer } from './result-displayer';

/** Display player name, their score of each turn and their total score. */
export class PlayerDisplayer extends ResultDisplayer implements Subscriber<number[]> {

	/** HTMLElement display all dice result. */
	public static debugElement = document.getElementById('debug');

	/** Store score of all players that are collected from all players publisher. */
	public static totalScoreOfAllPlayer = 0;

	/** Set up layout for each player to display their total score, dice result array and color it if they win. */
	public setupLayout(): void {
		const initialScore = 0;

		// Layout shows name of player and their total score.
		const playerHeader = document.createElement('h3');
		playerHeader.classList.add('currentIndex');
		playerHeader.textContent = `Player ${this.playerIndex + 1} - `;
		const playerScore = document.createElement('span');
		playerScore.textContent = initialScore.toString();

		// Layout shows the player dice result array through the game.
		const playerResults = document.createElement('ul');
		playerResults.classList.add('results');

		playerHeader.appendChild(playerScore);
		this.elementContainer.appendChild(playerHeader);
		this.elementContainer.appendChild(playerResults);
	}

	/**
	 * Update winner player.
	 * @param turnResult Index of player win who has score >= 21(which is win score required) firstly.
	 */
	public update(turnResult: number[]): void {
		// Update score of all players.
		const latestScore = turnResult.at(-1) ?? 0;
		PlayerDisplayer.totalScoreOfAllPlayer += latestScore;

		const spanDisplayAllTotalScore = PlayerDisplayer.debugElement?.querySelector('span');
		if (isHTMLElement(spanDisplayAllTotalScore)) {
			spanDisplayAllTotalScore.textContent = PlayerDisplayer.totalScoreOfAllPlayer.toString();
		}

		// Update each player's score.
		const spanDisplayPlayerTotalScore = this.elementContainer.querySelector('span');
		if (isHTMLElement(spanDisplayPlayerTotalScore)) {
			spanDisplayPlayerTotalScore.textContent = turnResult.reduce((acc, result) => acc + result, 0).toString();
		}

		// Append new dice result to each player display.
		const listItem = document.createElement('li');
		listItem.textContent = latestScore.toString();

		const listPlayerDiceResult = this.elementContainer.querySelector('ul');
		if (isHTMLElement(listPlayerDiceResult)) {
			listPlayerDiceResult.appendChild(listItem);
		}

		// Append new dice result to all player display.
		const listItemDebug = document.createElement('li');
		listItemDebug.textContent = latestScore.toString();

		const listAllDiceResult = PlayerDisplayer.debugElement?.querySelector('ul');
		if (isHTMLElement(listAllDiceResult)) {
			listAllDiceResult.appendChild(listItemDebug);
		}

	}
}
