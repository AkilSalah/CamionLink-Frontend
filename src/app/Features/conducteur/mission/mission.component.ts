import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, finalize, of } from 'rxjs';
import { Trajet } from '../../../Core/models/trajet.model';
import { TrajetService } from '../../../Core/services/trajet.service';
import { AuthService } from '../../../Core/services/auth.service';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})

export class MissionComponent implements OnInit {
  conducteurId: number = 0;
  trajets$ = new BehaviorSubject<any[]>([]);
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading = true;
  isUpdatingStatus = false;
  updatingTrajetId: number | null = null;

  constructor(
    private trajetService: TrajetService,
    private authService: AuthService
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
      this.trajets$.next(trajets.map(trajet => ({ ...trajet, statutSauvegarde: trajet.statut })));
      console.log('Trajets chargés:', this.trajets$.value);
      this.checkForLateTrajets();
    });
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
        const trajets = this.trajets$.value;
        const index = trajets.findIndex(t => t.id === trajetId);

        if (index !== -1) {
          trajets[index] = { ...trajets[index], ...updatedTrajet, statutSauvegarde: updatedTrajet.statut };
          this.trajets$.next([...trajets]);
        }

        this.successMessage = 'Statut du trajet mis à jour avec succès.';
        setTimeout(() => this.successMessage = null, 3000);
      }
    });
  }

  checkForLateTrajets(): void {
    const now = new Date();
    this.trajets$.value.forEach(trajet => {
      if (trajet.statut !== 'TERMINE' && new Date(trajet.dateArrivee) < now && trajet.statut !== 'EN_RETARD') {
        trajet.statut = 'EN_RETARD';
        this.updateTrajetStatus(trajet.id, 'EN_RETARD');
      }
    });
  }
}
