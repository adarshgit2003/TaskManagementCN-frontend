import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../shared/services/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  landing = true;
  user = false;
  main = false;
  profileMenu = false;
  constructor(public headerService: HeaderService, private router: Router) {}
  ngOnInit(): void {
    this.headerService.stateUpdate.subscribe((state) => {
      if (state === 'user') {
        this.user = true;
        this.landing = false;
        this.main = false;
      } else if (state === 'landing') {
        this.user = false;
        this.landing = true;
        this.main = false;
      } else {
        this.user = false;
        this.landing = false;
        this.main = true;
      }
    });
  }
  logout() {
    localStorage.removeItem('token');
    alert('Logged out');
    this.router.navigate(['/']);
  }
}
