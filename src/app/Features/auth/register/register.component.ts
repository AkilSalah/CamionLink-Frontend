import { Component } from '@angular/core';
import { AuthService } from '../../../Core/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  user = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    role: 'CONDUCTEUR',
    contact: '',
    numeroPermis: '',
    disponibilite: 'DISPONIBLE', 
  }

  successMessage : string|null = null;
  errorMessage : string|null = null;

  constructor(private authService : AuthService,private router: Router){}

  register(form : NgForm){
    if(form.invalid){
      return;
    }
    this.authService.register(this.user).subscribe({
      next : (response) =>{
        localStorage.setItem('token',response.token);
        this.successMessage = 'Registration successful!';
        this.errorMessage = null;
        console.log('Registration successful!')
      },
      error : (err) =>{
        this.errorMessage = 'Registration failed: ' + err.error;
        this.successMessage = null;
      }
    })
  }

}
