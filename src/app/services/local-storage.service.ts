import { Injectable } from '@angular/core';

type Storage = { [index: string]: string | undefined };

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  tempStorage: Storage = {};

  constructor() {}

  public getValue(key: string): string {
    const encodedKey = this.getEncodedFieldName(key);
    let encodedValue = undefined;
    try {
      encodedValue = window.sessionStorage.getItem(encodedKey);
    } catch (e) {
      encodedValue = this.tempStorage[encodedKey];
    }
    const stringValue = encodedValue && window.atob(encodedValue);

    return stringValue && JSON.parse(stringValue);
  }

  public setValue(key: string, value: any): void {
    const encodedKey = this.getEncodedFieldName(key);
    const stringValue = JSON.stringify(value);
    const encodedValue = window.btoa(stringValue);

    try {
      window.sessionStorage.setItem(encodedKey, encodedValue);
    } catch (e) {
      this.tempStorage[encodedKey] = encodedValue;
    }
  }

  public removeValue(key: string): void {
    const encodedKey = this.getEncodedFieldName(key);
    try {
      window.sessionStorage.removeItem(encodedKey);
    } catch (e) {
      this.tempStorage[encodedKey] = undefined;
    }
  }

  private getEncodedFieldName(key: string): string {
    return window.btoa(`@@${'front'.replace(/-/g, '_').toUpperCase()}:${key}`);
  }
}
