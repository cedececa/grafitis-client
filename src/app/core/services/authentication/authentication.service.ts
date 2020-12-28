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
          this.routeLogic(sdr, returnUrl, customNextUrl);
        },
        (error) => {
          this.nzMessageService.error(error.message);
        }
      );
  }

  private routeLogic(
    sdr: URLHttpSingleDataResponse<any>,
    returnUrl: string,
    customNextUrl: string
  ) {
    if (sdr.code == 200 && sdr.data) {
      this.setToken(sdr.data.accessToken);
      this.nzMessageService.success('Logueado con éxito.');
      //When true, navigates while replacing the current state in history.
      //https://stackoverflow.com/questions/51427689/angular-5-remove-route-history
      //console.log(returnUrl.length);
      //console.log(returnUrl);
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
  }

  setToken(token: string) {
    const expiresDate = (Date.now() + 24 * 60 * 60 * 1000).toString();

    //this is for test const expiresDate = (Date.now() + 5 * 1000).toString();
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(EXPIRES_DATE, expiresDate);
  }
  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRES_DATE);
  }

  register(user: UsuarioEntity) {
    this.lodingSpinModalService.open();
    this.http.post('auth/register', user).subscribe(
      (sdr: URLHttpSingleDataResponse<any>) => {
        this.lodingSpinModalService.close();
        if (sdr.data) {
          this.nzMessageService.success('Registrado con éxito');
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
          //this.nzMessageService.error(sdr.message);
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

        this.nzMessageService.success('Salir con éxito');
        this.router.navigate(['/login']);

        localStorage.removeItem(TOKEN_KEY);

        return sdr.data;
      })
    );
  }

  /*   autentitcateGoogle() {
    return this.http
      .get<URLHttpSingleDataResponse<{ accessToken: string }>>(
        `auth/google/redirect`
      )
      .pipe(
        map((sdr) => {
          if (sdr.code == 200) {
            this.nzMessageService.success(`Logueado con google cuenta.`);
            this.routeLogic(sdr, '', '');
          } else {
            this.nzMessageService.error(
              `Logueado fallido, ${sdr.code}: ${sdr.message}`
            );
          }

          return sdr;
        })
      );
  } */

  isValidAutentication() {
    const expiresDateString = localStorage.getItem(EXPIRES_DATE);
    const token = localStorage.getItem(TOKEN_KEY);
    const expiresDateInt = parseInt(expiresDateString, 10);

    if (token && token.length > 10 && expiresDateInt > Date.now()) {
      return true;
    } else {
      return false;
    }
  }
}
