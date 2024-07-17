import { Subscriber } from './subscriber';

/** Publisher model. */
export class Publisher<T> {
	private _subscribers = new Set<Subscriber<T>>();

	/**
	 * Get the subscriber info to push to subscriber db.
	 * @param subscriber Info new Subscriber.
	 */
	public subscribe(subscriber: Subscriber<T>): void {
		this._subscribers.add(subscriber);
	}

	/** Get the subscribers to get player instance. */
	protected get subscribers(): Set<Subscriber<T>> {
		return this._subscribers;
	}

	/**
	 * Remove subscriber.
	 * @param subscriber Info of subscriber.
	 */
	public unsubscribe(subscriber: Subscriber<T>): void {

		if (this._subscribers.has(subscriber)) {
			this._subscribers.delete(subscriber);
		}
	}

	/**
	 * Notification to subscriber.
	 * @param message Message to Notify.
	 */
	public notify(message: T): void {
		this.subscribers.forEach(subscriber => subscriber.update(message));
	}
}
