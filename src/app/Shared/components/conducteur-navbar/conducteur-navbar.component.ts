import { Component } from '@angular/core';
import { AuthService } from '../../../Core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conducteur-navbar',
  templateUrl: './conducteur-navbar.component.html',
  styleUrl: './conducteur-navbar.component.css'
})
export class ConducteurNavbarComponent {
  showDropdown: boolean = false;
  user : any
  isLoggedIn : boolean = false
  constructor(private authService : AuthService , private router : Router){}

  ngOnInit(): void {
    this.user = this.authService.getUser();

  }
  openDropDown() {
    this.showDropdown = !this.showDropdown;
  }
  logout(): void {
    this.authService.logout().subscribe(() => {
      this.isLoggedIn = false;
      this.router.navigate(['']);
    });
  }
}
