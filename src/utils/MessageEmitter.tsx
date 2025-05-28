class MessageEmitter {
  private listeners: any;

  constructor() {
    this.listeners = {};
  }

  on(event: any, callback: any) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: any, callback: any) {
    if (!this.listeners[event]) return;

    const index = this.listeners[event].indexOf(callback);
    if (index > -1) {
      this.listeners[event].splice(index, 1);
    }
  }

  emit(event: any, data: any) {
    if (!this.listeners[event]) return;

    this.listeners[event].forEach((callback:any) => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in ${event} listener:`, error);
      }
    });
  }

  removeAllListeners(event: any) {
    if (event) {
      delete this.listeners[event];
    } else {
      this.listeners = {};
    }
  }
}

export const messageEmitter = new MessageEmitter();
