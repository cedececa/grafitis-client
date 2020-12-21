import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-login-failure',
  templateUrl: './google-login-failure.component.html',
  styleUrls: ['./google-login-failure.component.css'],
})
export class GoogleLoginFailureComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  timeleft = 3;
  countdown() {
    var downloadTimer = setInterval(() => {
      if (this.timeleft <= 0) {
        clearInterval(downloadTimer);
      }
      this.timeleft -= 1;
    }, 1000);
  }
  goToMapaGrafitis() {
    this.router.navigateByUrl('/login');
  }
}
