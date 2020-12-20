import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { URLHttpSingleDataResponse } from '../../entities-for-http/url-http-single-data-response.entity';
import { LoadingSpinModalService } from '../loading-spin-modal/loading-spin-modal.service';
import { UsuarioEntity } from '../../entities/usuario.entity';
import { map } from 'rxjs/operators';

const TOKEN_KEY = 'auth-token';
const EXPIRES_DATE = 'expires-date';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private lodingSpinModalService: LoadingSpinModalService,
    private nzMessageService: NzMessageService
  ) {}

  getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_DATE);
  }

  checkToken() {
    if (
      localStorage.getItem(TOKEN_KEY) &&
      localStorage.getItem(TOKEN_KEY).length > 10
    ) {
      return true;
    }
    return false;
  }

  login(
    email: String,
    password: String,
    returnUrl: string,
    customNextUrl?: string
  ) {
    this.lodingSpinModalService.open();
    this.http
      .post('auth/login', { email: email, password: password })
      .subscribe(
        (sdr: URLHttpSingleDataResponse<any>) => {
          //console.log(sdr);
          this.lodingSpinModalService.close();
          if (sdr.code == 200 && sdr.data) {
            const expiresDate = (Date.now() + 24 * 60 * 60 * 1000).toString();

            //this is for test const expiresDate = (Date.now() + 5 * 1000).toString();
            localStorage.setItem(TOKEN_KEY, sdr.data.accessToken);
            localStorage.setItem(EXPIRES_DATE, expiresDate);

            this.nzMessageService.success('Logueado con exito.');
            //When true, navigates while replacing the current state in history.
            //https://stackoverflow.com/questions/51427689/angular-5-remove-route-history
            console.log(returnUrl.length);
            console.log(returnUrl);
            if (returnUrl.length <= 1) {
              // returnUrl: '/'
              this.router.navigate([customNextUrl], {
                replaceUrl: true,
              });
            } else {
              this.router.navigate([returnUrl], {
                replaceUrl: true,
              });
            }
          } else {
            this.nzMessageService.error(sdr.message);
          }
        },
        (error) => {
          this.nzMessageService.error(error.message);
        }
      );
  }

  register(user: UsuarioEntity) {
    this.lodingSpinModalService.open();
    this.http.post('auth/register', user).subscribe(
      (sdr: URLHttpSingleDataResponse<any>) => {
        this.lodingSpinModalService.close();
        if (sdr.data) {
          this.nzMessageService.success('Registrado con exito');
          this.router.navigate(['/login']);
        } else {
          this.nzMessageService.error(sdr.message);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUsuarioLogueado() {
    return this.http.get('auth/perfil').pipe(
      map((sdr: URLHttpSingleDataResponse<UsuarioEntity>) => {
        if (sdr.code != 200) {
          this.nzMessageService.error(sdr.message);
        }
        return sdr.data;
      })
    );
  }

  logout() {
    return this.http.get('auth/logout').pipe(
      map((sdr: URLHttpSingleDataResponse<UsuarioEntity>) => {
        if (sdr.code != 200) {
          this.nzMessageService.error(sdr.message);
        }

        this.nzMessageService.success('Salir con exito');
        this.router.navigate(['/login']);

        localStorage.removeItem(TOKEN_KEY);

        return sdr.data;
      })
    );
  }
}
