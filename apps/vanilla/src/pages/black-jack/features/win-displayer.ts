import { isElement } from '@js-camp/vanilla/type-guards/is-element';
import { isButtonElement } from '@js-camp/vanilla/type-guards/is-button-element';

import { Subscriber } from '../models/subscriber';

import { ResultDisplayer } from './result-displayer';

/** Display winner. */
export class WinDisplayer extends ResultDisplayer implements Subscriber<boolean> {

	/**
	 * Update winner player.
	 * @param isWinner Whether user has score >= 21(which win score required) firstly.
	 */
	public update(isWinner: boolean): void {
		if (!isWinner) {
			return;
		}
		const playerElement = this.elementContainer.querySelector('ul');
		const rollButton = document.getElementById('roll-dice');
		if (isElement(playerElement) && isButtonElement(rollButton)) {
			playerElement.classList.add('pink');
			rollButton.disabled = true;
		}
	}
}
