import { isDevMode } from '@angular/core';

export class ServicesBaseURL {
  static getBaseURL() {
    const developBaseURL = 'http://localhost:3000';
    const productionBaseURL = 'http://graftifs.a5.ppnncc.com';
    let baseURL:string;
    if (isDevMode()) {
      baseURL = developBaseURL;
    } else {
      baseURL = productionBaseURL;
    }

    return baseURL;
  }
}
