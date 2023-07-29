import { Component } from '@angular/core';
import { HeaderService } from '../shared/services/header.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  constructor(
    public headerService: HeaderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.headerService.changeState('landing');
    if (localStorage.getItem('token')) {
      let valid = this.authService
        .validate(localStorage.getItem('token'))
        .subscribe(
          (success) => {
            this.router.navigate(['/main']);
            console.log('Success');
          },
          (error) => {}
        );
    }
  }
  onSubmit(form: any) {
    this.router.navigate(['/register']);
  }
}
