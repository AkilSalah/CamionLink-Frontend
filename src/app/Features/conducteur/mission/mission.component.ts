import { Component, OnInit } from '@angular/core';
import { catchError, finalize, of } from 'rxjs';
import { TrajetService } from '../../../Core/services/trajet.service';
import { AuthService } from '../../../Core/services/auth.service';
import { Depense } from '../../../Core/models/depense.model';
import { DepenseService } from '../../../Core/services/depense.service';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})

export class MissionComponent implements OnInit {
  conducteurId: number = 0;
  trajets: any[] = [];
  depensesParTrajet: { [trajetId: number]: Depense[] } = {}; 
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading = true;
  isUpdatingStatus = false;
  updatingTrajetId: number | null = null;
  selectedTrajetId: number | null = null;

  constructor(
    private trajetService: TrajetService,
    private authService: AuthService,
    private depenseService: DepenseService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.conducteurId = user?.userId || 0;
    this.loadTrajets();
  }

  loadTrajets(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.trajetService.getConducteurTrajet(this.conducteurId).pipe(
      catchError(err => {
        console.error('Erreur lors du chargement:', err);
        this.errorMessage = 'Erreur lors du chargement des trajets.';
        return of([]);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(trajets => {
      this.trajets = trajets.map(trajet => ({ ...trajet, statutSauvegarde: trajet.statut }));
      this.checkForLateTrajets();
      
      this.trajets.forEach(trajet => {
        this.loadTrajetDepenses(trajet.id);
      });
    });
  }

  loadTrajetDepenses(trajetId: number): void {
    if (!trajetId) {
      console.error('Tentative de chargement des dépenses avec un ID de trajet non défini');
      return;
    }
    
    this.depenseService.getTrajetDepenses(trajetId).pipe(
      catchError(error => {
        console.error(`Erreur lors du chargement des dépenses pour le trajet ${trajetId}:`, error);
        return of([]);
      })
    ).subscribe(depenses => {
      this.depensesParTrajet[trajetId] = depenses;
    });
  }

  getTrajetDepenses(trajetId: number): Depense[] {
    return this.depensesParTrajet[trajetId] || [];
  }

  updateTrajetStatus(trajetId: number, statut: string): void {
    this.isUpdatingStatus = true;
    this.updatingTrajetId = trajetId;
    this.errorMessage = null;
    this.successMessage = null;

    this.trajetService.updateTrajetStatus(this.conducteurId, trajetId, statut).pipe(
      catchError(error => {
        console.error('Erreur lors de la mise à jour du statut:', error);
        this.errorMessage = 'Erreur lors de la mise à jour du statut. Veuillez réessayer.';
        return of(null);
      }),
      finalize(() => {
        this.isUpdatingStatus = false;
        this.updatingTrajetId = null;
      })
    ).subscribe(updatedTrajet => {
      if (updatedTrajet) {
        const index = this.trajets.findIndex(t => t.id === trajetId);
        if (index !== -1) {
          this.trajets[index] = { 
            ...this.trajets[index], 
            ...updatedTrajet, 
            statutSauvegarde: updatedTrajet.statut 
          };
        }

        this.successMessage = 'Statut du trajet mis à jour avec succès.';
        setTimeout(() => this.successMessage = null, 3000);
      }
    });
  }

  checkForLateTrajets(): void {
    const now = new Date();
    this.trajets.forEach(trajet => {
      if (trajet.statut !== 'TERMINE' && new Date(trajet.dateArrivee) < now && trajet.statut !== 'EN_RETARD') {
        trajet.statut = 'EN_RETARD';
        this.updateTrajetStatus(trajet.id, 'EN_RETARD');
      }
    });
  }
  
  onDepensesChange(trajetId: number, depenses: Depense[]): void {
    this.depensesParTrajet[trajetId] = depenses;
  }
  
  onSuccessMessage(message: string): void {
    this.successMessage = message;
    setTimeout(() => this.successMessage = null, 3000);
  }
  
  onErrorMessage(message: string): void {
    this.errorMessage = message;
  }
}