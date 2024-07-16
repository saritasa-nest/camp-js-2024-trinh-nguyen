import { Player } from '../pages/black-jack/features/player';

/**
 * Check a subscriber is a player or not.
 * @param subscriber Subscriber object.
 */
export function isPlayer(subscriber: unknown): subscriber is Player {
	return (subscriber as Player).index !== undefined;
}
