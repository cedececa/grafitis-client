import { isDevMode } from '@angular/core';

export class ServicesBaseURL {
  static getBaseURL() {
    const developBaseURL = 'http://15.237.37.37:3000';
    const productionBaseURL = 'http://15.237.37.37:3000';
    let baseURL:string;
    if (isDevMode()) {
      baseURL = developBaseURL;
    } else {
      baseURL = productionBaseURL;
    }

    return baseURL;
  }
}
