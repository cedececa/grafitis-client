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
  usuarioLogueado: UsuarioEntity = null;
  constructor(private autenticactionService: AuthenticationService) {}

  ngOnInit(): void {
    this.getPerfil();
  }
  getPerfil() {
    
    var intervalTask = setInterval(() => {
      console.log(this.autenticactionService.isValidAutentication())
      if (this.autenticactionService.isValidAutentication()) {
        this.autenticactionService.getUsuarioLogueado().subscribe((usuario) => {
          this.usuarioLogueado = usuario;
          console.log(this.usuarioLogueado)
          this.visibleForUsuarioAutenticated = true;
          clearInterval(intervalTask);
        });
      }
    }, 1000);
  }
  visibleForUsuarioAutenticated = false;
  salir() {
    this.visibleForUsuarioAutenticated = false;
    this.autenticactionService.logout().subscribe();
    this.getPerfil();
  }
}
