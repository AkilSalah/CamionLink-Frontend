import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  constructor(private router: Router, private authService: AuthService) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/unauthorized'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    
    const requiredRole = route.data['role'];
    
    if (!requiredRole) {
      return true;
    }
    
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        
        if (decodedToken.roles && decodedToken.roles.includes(requiredRole)) {
          return true;
        }
      } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
      }
    }
    
    this.router.navigate(['/unauthorized'], { queryParams: { message: 'Vous n\'avez pas les droits nécessaires pour accéder à cette ressource' } });
    return false;
  }
}