import { Component, OnInit } from '@angular/core';
import { ConducteurService } from '../../../Core/services/conducteur.service';
import { AuthService } from '../../../Core/services/auth.service';
import { Utilisateur } from '../../../Core/models/utilisateur.model';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  conducteur: Utilisateur = {
    id: 0,
    nom : '',
    prenom : '',
    email : '',
    password : '',
    contact: 0,
    numeroPermis : '',
    disponibilite : ''  
  };

  isLoading = true;
  errorMessage = '';
  successMessage = '';

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  
  showDeleteModal = false;
  deleteConfirmation = '';

  constructor(
    private conducteurService: ConducteurService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData() {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.conducteurService.getConducteurAccount()
      .pipe(
        catchError(error => {
          this.errorMessage = 'Erreur lors de la récupération des données du profil. Veuillez réessayer.';
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(data => {
        if (data) {
          this.conducteur = data;
        }
      });
  }
  updateProfile() {
    if (!this.conducteur) return;
  
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
  
    if (this.newPassword) {
      if (!this.currentPassword) {
        this.errorMessage = 'Veuillez saisir votre mot de passe actuel.';
        this.isLoading = false;
        return;
      }
  
      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = 'Le nouveau mot de passe et sa confirmation ne correspondent pas.';
        this.isLoading = false;
        return;
      }
  
      this.authService.verifyPassword(this.conducteur.id, this.currentPassword).subscribe(
        (isValid) => {
          if (!isValid) {
            this.errorMessage = 'Le mot de passe actuel est incorrect.';
            this.isLoading = false;
            return;
          }
  
          this.conducteur.password = this.newPassword;
  
          this.conducteurService.updateConducteur(this.conducteur.id, this.conducteur)
            .pipe(
              catchError(error => {
                this.errorMessage = 'Erreur lors de la mise à jour du profil. Veuillez réessayer.';
                console.error('Erreur lors de la mise à jour du profil:', error);
                return of(null);
              }),
              finalize(() => {
                this.isLoading = false;
              })
            )
            .subscribe(updatedConducteur => {
              if (updatedConducteur) {
                this.conducteur = updatedConducteur;
                this.successMessage = 'Profil mis à jour avec succès!';
  
                this.currentPassword = '';
                this.newPassword = '';
                this.confirmPassword = '';
              }
            });
        },
        (error) => {
          this.errorMessage = 'Erreur lors de la vérification du mot de passe. Veuillez réessayer.';
          this.isLoading = false;
        }
      );
    } else {
      this.conducteurService.updateConducteur(this.conducteur.id, this.conducteur)
        .pipe(
          catchError(error => {
            this.errorMessage = 'Erreur lors de la mise à jour du profil. Veuillez réessayer.';
            console.error('Erreur lors de la mise à jour du profil:', error);
            return of(null);
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(updatedConducteur => {
          if (updatedConducteur) {
            this.conducteur = updatedConducteur;
            this.successMessage = 'Profil mis à jour avec succès!';
          }
        });
    }
  }

  openDeleteModal() {
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.deleteConfirmation = '';
  }

  deleteAccount() {
    if (!this.conducteur) return;
    
    if (this.deleteConfirmation === 'SUPPRIMER') {
      this.isLoading = true;
      
      this.conducteurService.deleteConducteurAccount(this.conducteur.id)
        .pipe(
          catchError(error => {
            this.errorMessage = 'Erreur lors de la suppression du compte. Veuillez réessayer.';
            console.error('Erreur lors de la suppression du compte:', error);
            this.closeDeleteModal();
            return of(null);
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(() => {
          this.authService.logout();
          this.router.navigate(['']);
        });
    }
  }
}