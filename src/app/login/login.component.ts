import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderService } from '../shared/services/header.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    public headerService: HeaderService,
    public authService: AuthService,
    public router: Router
  ) {}
  serverSide = false;
  userNotFound = false;
  invalidCredentials = false;
  loginForm;
  ngOnInit(): void {
    this.headerService.changeState('user');
  }
  onSubmit(form: any) {
    this.loginForm = form;
    this.authService.login(form.value.email, form.value.password).subscribe(
      (data: any) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/main']);
      },
      (errorResponce) => {
        this.resetAlert(errorResponce.status);
      }
    );
  }
  resetAlert(status: number) {
    switch (status) {
      case 500:
        this.serverSide = true;
        setTimeout(this.resetHelper, 10000);
        break;
      case 404:
        this.userNotFound = true;
        setTimeout(this.resetHelper, 10000);
        break;
      case 403:
        this.invalidCredentials = true;
        setTimeout(this.resetHelper, 10000);
        break;
    }
  }
  resetHelper() {
    this.serverSide = false;
    this.userNotFound = false;
    this.invalidCredentials = false;
  }
}
