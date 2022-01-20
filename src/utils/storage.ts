class BrowserStorage {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  get(key: string): string {
    return atob(this.storage.getItem(btoa(key)) || '');
  }

  set(key: string, value: string): void {
    return this.storage.setItem(btoa(key), btoa(value));
  }

  getJSON<T>(key: string): T {
    return JSON.parse(atob(this.storage.getItem(btoa(key)) || '') || '{}');
  }

  setJSON<T>(key: string, value: T): void {
    return this.storage.setItem(btoa(key), btoa(JSON.stringify(value)));
  }

  remove(key: string): void {
    return this.storage.removeItem(btoa(key));
  }

  clear(key: string) {
    return this.storage.getItem(btoa(key));
  }
}

export const Local = new BrowserStorage(window.localStorage);
export const Session = new BrowserStorage(window.sessionStorage);
