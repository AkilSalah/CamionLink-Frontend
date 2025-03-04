import { Component } from '@angular/core';
import { AuthService } from '../../../Core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
  showSideBar : boolean = false;
  isLoggedIn : boolean = false

  constructor(private authService: AuthService , private router :Router) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  displaySidebar(){
    this.showSideBar = true;
  }
  
  closeSidebar(){
    this.showSideBar = false;
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.isLoggedIn = false;
      this.router.navigate(['']);
    });
  }
}
