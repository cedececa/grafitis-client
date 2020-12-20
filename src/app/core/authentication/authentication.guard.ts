import { Injectable } from '@angular/core';
import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private messageService: NzMessageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      localStorage.getItem('auth-token') &&
      localStorage.getItem('auth-token').length > 10 &&
      localStorage.getItem('expires-date')
    ) {
      const result =
        parseInt(this.authenticationService.getTokenExpiresDate(), 10) >
        Date.now();
      console.log(this.authenticationService.getTokenExpiresDate());
      console.log(Date.now());
      console.log(result);

      if (!result) {
        this.messageService.warning(
          'Por favor, entrar con su cuenta de nuevo.'
        );

        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      }

      return true;
    }

    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url },
    });
    this.messageService.warning('Por favor, entrar con su cuenta de nuevo.');

    return false;
  }
}
