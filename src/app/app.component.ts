import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { slideInAnimation } from './animations';
import { UsuarioEntity } from './core/entities/usuario.entity';
import { AuthenticationService } from './core/services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  title = 'grafitis-client-angular-zorro';
  getAnimationData(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
  
  constructor(private autenticactionService: AuthenticationService) {}

  ngOnInit(): void {

  }
  autenticado$ = this.autenticactionService.autenticado$;

  usuarioLogueado$ = this.autenticactionService.usuarioLogueado$;
  salir() {
    this.autenticactionService.logout().subscribe();
  }
  getURL(url: String) {
    if (url&&url.includes('google')) {
      return url;
    } else {
      return `http://15.237.37.37:3000/${url}`;
    }
  }
}
