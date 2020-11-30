import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { ServicesBaseURL } from 'src/app/configs/services.rest.config';


@Injectable()
export class URLBaseInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const url = ServicesBaseURL.getBaseURL();

    req = req.clone({
      url: `${url}/${req.url}`
    });
    return next.handle(req);
  }
}
