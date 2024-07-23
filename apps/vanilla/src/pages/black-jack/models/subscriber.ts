/** Subscriber. */
export type Subscriber<T> = {

	/**
	 * Update when publisher has new message.
	 * @param message Message.
	 */
	update(message: T): void;
};
