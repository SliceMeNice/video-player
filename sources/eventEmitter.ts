type EventListenerCallback = (...eventParameters: any) => void;

interface EventListener {
	callback: EventListenerCallback;
	once: boolean;
}

export class EventEmitter {
	protected eventListeners: { [key: string]: EventListener[] } = {};

	on(eventName: string, listener: EventListenerCallback, once: boolean = false) {
		const listeners = this.eventListeners[eventName] || [];

		listeners.push({
			callback: listener,
			once: once
		});

		this.eventListeners[eventName] = listeners;

		return this;
	}

	once(eventName: string, listener: EventListenerCallback) {
		return this.on(eventName, listener, true);
	}

	off(eventName?: string, listener?: EventListenerCallback) {
		if (!eventName) {
			this.eventListeners = {};
		} else if (!listener) {
			this.eventListeners[eventName] = [];
		} else {
			const listeners = this.eventListeners[eventName] || [];

			for (let i = listeners.length - 1; i >= 0; i--) {
				if (listeners[i].callback === listener) {
					listeners.splice(i, 1);
				}
			}
		}

		return this;
	}

	trigger(eventName: string, ...eventData: any) {
		const listeners = [...(this.eventListeners[eventName] || []), ...(this.eventListeners['*'] || [])];
		const onceListeners: number[] = [];

		listeners.forEach((listener: EventListener, index: number) => {
			if (listener.callback) {
				listener.callback.apply(this, eventData);
			} else {
				// if there is no callback, remove!
				listener.once = true;
			}

			if (listener.once) {
				onceListeners.push(index);
			}
		});

		// remove listeners marked as once
		for (let i = onceListeners.length - 1; i >= 0; i--) {
			listeners.splice(onceListeners[i], 1);
		}

		return this;
	}
}
