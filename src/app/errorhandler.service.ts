import { ErrorHandler } from '@angular/core';

// Global error handling

export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.log(error);
  }
}
