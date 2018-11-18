declare type EventListenerCallback = (...eventParameters: any) => void;
interface EventListener {
    callback: EventListenerCallback;
    once: boolean;
}
export declare class EventEmitter {
    protected eventListeners: {
        [key: string]: EventListener[];
    };
    on(eventName: string, listener: EventListenerCallback, once?: boolean): this;
    once(eventName: string, listener: EventListenerCallback): this;
    off(eventName?: string, listener?: EventListenerCallback): this;
    trigger(eventName: string, ...eventData: any): this;
}
export {};
