import { Subscriber } from './subscriber';

/** Publisher model. */
export class Publisher<T> {
	private subscribers: Subscriber<T>[] = [];

	/**
	 * Constructor.
	 * @param subscriber Info new Subscriber.
	 */
	public subscribe(subscriber: Subscriber<T>): void {
		this.subscribers.push(subscriber);
	}

	// TODO
	/** */
	public getSubcribers(): readonly Subscriber<T>[] {
		return this.subscribers;
	}

	/**
	 * Get the index.
	 * @param subscriber Info new Subscriber.
	 */
	public getSubscriberIndex(subscriber: Subscriber<T>): number {
		return this.subscribers.findIndex(sub => sub === subscriber);
	}

	/**
	 * Unsubscribe.
	 * @param subscriber Info of subscriber.
	 */
	public unsubscribe(subscriber: Subscriber<T>): void {
		this.subscribers = this.subscribers.filter(subscriberItem => subscriberItem !== subscriber);
	}

	/**
	 * Notification.
	 * @param message Message to Notify.
	 */
	public notify(message: T): void {
		this.subscribers.forEach(subscriber => subscriber.update(message));
	}
}
