import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { ServicesBaseURL } from 'src/app/configs/services.rest.config';
import { catchError, map } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { LoadingSpinModalService } from '../services/loading-spin-modal/loading-spin-modal.service';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable()
export class URLBaseInterceptor implements HttpInterceptor {
  constructor(
    private nzModalService: NzModalService,
    private router: Router,
    private messageService: NzMessageService,
    private lodingSpinModalService: LoadingSpinModalService,
    private authenticationService: AuthenticationService
  ) {}
  errorModal(title, message) {
    this.nzModalService.error({
      nzTitle: title,
      nzContent: message,
      nzOkText: '确认',
    });
  }
  intercept1(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        console.log('error is intercept');
        console.error(error);
        return throwError(error.message);
      })
    );
  }
  intercept2(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('auth-token');
    const url = ServicesBaseURL.getBaseURL();

    req = req.clone({
      url: `${url}/${req.url}`,
    });
    req = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });

    return next.handle(req).pipe(
      catchError((error) => {
        console.log('error in intercept');
        console.error(error);
        return throwError(error.message);
      })
    );
  }

  setToken(req: HttpRequest<any>) {
    const token: string = localStorage.getItem('auth-token');
    const url = ServicesBaseURL.getBaseURL();

    req = req.clone({
      url: `${url}/${req.url}`,
    });
    req = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });

    return req;
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = this.setToken(req);

    return next.handle(req).pipe(
      catchError((error) => {
        let handled: boolean = false;
        console.error(error);
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error('Error de evento');
          } else {
            console.log(
              `Error de evento : ${error.status} ${error.statusText}`
            );
            switch (error.status) {
              case 401: //login
                this.authenticationService.clearToken();
                this.router.navigate(['/login']);
                this.errorModal(
                  'No autorizado',
                  'Por favor, entrar con la cuenta de nuevo.'
                );
                handled = true;
                break;
              case 403: //forbidden
                this.authenticationService.clearToken();
                this.router.navigate(['/login']);
                this.errorModal(
                  'No autorizado',
                  'Por favor, entrar con la cuenta de nuevo.'
                );
                handled = true;
                break;
              case 500: //forbidden
                this.errorModal(
                  'Error Servidor',
                  'Estimado cliente, nuestro servidro ha tenido un fallo, intente mas tarde'
                );
                handled = true;
                break;
              default:
                this.errorModal('Otro tipo de error', error);
            }
          }
        } else {
          this.errorModal('Otro tipo de error', error);
        }
        this.lodingSpinModalService.close();

        if (handled) {
          console.log('Devolver error');
          return of(error);
        } else {
          console.log('Devolver error al suscriptor');
          return throwError(error);
        }
      })
    );
  }
}
