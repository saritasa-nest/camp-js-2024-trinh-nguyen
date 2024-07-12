/** Subscriber. */
export type Subscriber<T> = {

	/**
	 * Update.
	 * @param message Message.
	 */
	update(message: T): void;
};
