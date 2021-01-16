export enum PubSubEventName {
  ON_UPLOAD_PROGRESS = 'ON_UPLOAD_PROGRESS',
}

export interface PubSubCallback {
  (data: any): void;
}

function pubSub() {
  const subscribers: { [key: string]: PubSubCallback[] } = {};

  function publish<T>(eventName: PubSubEventName, data: T) {
    if (!Array.isArray(subscribers[eventName])) {
      return;
    }

    subscribers[eventName].forEach((callback: PubSubCallback) => {
      callback(data);
    });
  }

  function subscribe(eventName: PubSubEventName, callback: PubSubCallback) {
    if (!Array.isArray(subscribers[eventName])) {
      subscribers[eventName] = [];
    }

    subscribers[eventName].push(callback);
    const index = subscribers[eventName].length - 1;

    return () => {
      subscribers[eventName].splice(index, 1);
    };
  }

  return {
    publish,
    subscribe,
  };
}

export default pubSub();
