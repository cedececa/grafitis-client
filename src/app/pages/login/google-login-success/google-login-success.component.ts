import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-google-login-success',
  templateUrl: './google-login-success.component.html',
  styleUrls: ['./google-login-success.component.css'],
})
export class GoogleLoginSuccessComponent implements OnInit {
  constructor(
    private autenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.params.token;
    console.log(token);
    if (String(token).length > 0) {
      this.autenticationService.setToken(this.route.snapshot.params.token);
    }
    setTimeout(() => {
      this.goToMapaGrafitis();
    }, 3000);
  }
  goToMapaGrafitis() {
    this.router.navigateByUrl('/usuario/mapa-grafitis');
  }

  timeleft = 3;
  countdown() {
    var downloadTimer = setInterval(() => {
      if (this.timeleft <= 0) {
        clearInterval(downloadTimer);
      }
      this.timeleft -= 1;
    }, 1000);
  }
  getSubTitle(){
    return `Le vamos a llevar a la pagina de Grafitis Mapa en ${this.timeleft} segundos`
  }
}
