import { Subscriber } from './subscriber';

/** Publisher model. */
export class Publisher<T> {
	private _subscribers: Subscriber<T>[] = [];

	/**
	 * Get the subscriber info to push to subscriber db.
	 * @param subscriber Info new Subscriber.
	 */
	public subscribe(subscriber: Subscriber<T>): void {
		this._subscribers.push(subscriber);
	}

	/** Get the subscribers to get player instance. */
	protected get subscribers(): readonly Subscriber<T>[] {
		return this._subscribers;
	}

	/**
	 * Remove subscriber.
	 * @param subscriber Info of subscriber.
	 */
	public unsubscribe(subscriber: Subscriber<T>): void {

		this._subscribers = this.subscribers.filter(subscriberItem => subscriberItem !== subscriber);
	}

	/**
	 * Notification to subscriber.
	 * @param message Message to Notify.
	 */
	public notify(message: T): void {
		this.subscribers.forEach(subscriber => subscriber.update(message));
	}
}
