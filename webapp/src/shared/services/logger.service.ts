import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private isEnabled = true;
  enableLogging(): void {
    this.isEnabled = true;
  }

  disableLogging(): void {
    this.isEnabled = false;
  }

  debug(...messages: any[]): void {
    if (this.isEnabled) {
      console.log(...messages);
    }
  }

  error(...messages: any[]): void {
    if (this.isEnabled) {
      console.error(...messages);
    }
  }

  warn(...messages: any[]): void {
    if (this.isEnabled) {
      console.warn(...messages);
    }
  }

  info(...messages: any[]): void {
    if (this.isEnabled) {
      console.info(...messages);
    }
  }
}
