import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../Core/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = {
    email : '',
    password : '',
    role : ''
  }
  errorMessage : string | null = null;

  constructor(private authService: AuthService , private router:Router){}
  login( form : NgForm){
    if( form.invalid){
      return;
    }
    this.authService.login(this.user).subscribe({
      next : (response) =>{
        if(response.type == 'ADMIN'){
          console.log("admin hada")
          this.router.navigate(['/admin/dashboard']);
        }else if(response.type == 'CONDUCTEUR'){
          console.log("hada ra chiffor");
          this.router.navigate(['/conducteur/home'])
        }
      },
      error : (err) =>{
        console.error('Login failed:', err);
        this.errorMessage = 'Login failed: ' + (err.error?.message || 'Unknown error'); 
        setTimeout(() => this.errorMessage = null, 3000);
      },
    })
  }

}
