import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, finalize, of } from 'rxjs';
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
  depensesParTrajet: { [trajetId: number]: any[] } = {}; // Objet simple au lieu de Map
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading = true;
  isUpdatingStatus = false;
  isSubmittingDepense = false;
  updatingTrajetId: number | null = null;
  selectedTrajetId: number | null = null;
  showDepenseModal = false;
  
  nouvelleDepense: any = {
    id: 0,
    typeDepense: '',
    montant: 0,
    date: '',
    trajetId: 0,
    statut: 'EN_ATTENTE'
  };

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
      // Ajouter statutSauvegarde à chaque trajet
      this.trajets = trajets.map(trajet => ({ ...trajet, statutSauvegarde: trajet.statut }));
      this.checkForLateTrajets();
      
      // Charger les dépenses pour chaque trajet
      this.trajets.forEach(trajet => {
        this.loadTrajetDepenses(trajet.id);
      });
    });
  }

  loadTrajetDepenses(trajetId: number): void {
    // Vérifier que l'ID du trajet est défini
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
      // Utiliser un objet simple au lieu d'une Map
      this.depensesParTrajet[trajetId] = depenses;
      console.log(`Dépenses chargées pour le trajet ${trajetId}:`, depenses);
    });
  }

  // Récupérer les dépenses d'un trajet spécifique
  getTrajetDepenses(trajetId: number): any[] {
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
        // Mise à jour du trajet modifié
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
  
  // Méthodes pour gérer les dépenses
  openDepenseModal(trajetId: number): void {
    this.selectedTrajetId = trajetId;
    this.nouvelleDepense = {
      id: 0,
      typeDepense: '',
      montant: 0,
      date: new Date().toISOString().split('T')[0], 
      trajetId: trajetId,
      statut: 'EN_ATTENTE'
    };
    this.showDepenseModal = true;
  }
  
  closeDepenseModal(): void {
    this.showDepenseModal = false;
    this.selectedTrajetId = null;
  }
  
  ajouterDepense(): void {
    if (!this.nouvelleDepense.montant || !this.nouvelleDepense.typeDepense || !this.nouvelleDepense.date) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }
    
    // Assurez-vous que l'ID du trajet est bien défini
    if (!this.selectedTrajetId) {
      this.errorMessage = 'ID du trajet non défini. Veuillez réessayer.';
      return;
    }
    
    // Assurez-vous que l'ID du trajet est correctement assigné à la dépense
    this.nouvelleDepense.trajetId = this.selectedTrajetId;
    
    this.isSubmittingDepense = true;
    this.errorMessage = null;
    
    this.depenseService.addDepense(this.nouvelleDepense).pipe(
      catchError(error => {
        console.error('Erreur lors de l\'ajout de la dépense:', error);
        this.errorMessage = 'Erreur lors de l\'ajout de la dépense. Veuillez réessayer.';
        return of(null);
      }),
      finalize(() => {
        this.isSubmittingDepense = false;
      })
    ).subscribe(newDepense => {
      if (newDepense) {
        // Vérifiez que l'ID du trajet est défini dans la réponse
        const trajetId = newDepense.trajetId || this.selectedTrajetId;
        
        if (!trajetId) {
          console.error('ID du trajet non défini dans la réponse');
          this.errorMessage = 'Erreur lors de l\'ajout de la dépense. ID du trajet non défini.';
          return;
        }
        
        // Initialiser un tableau vide si besoin
        if (!this.depensesParTrajet[trajetId]) {
          this.depensesParTrajet[trajetId] = [];
        }
        
        // Ajouter la nouvelle dépense à la liste
        this.depensesParTrajet[trajetId] = [...this.depensesParTrajet[trajetId], newDepense];
        
        // Créer un nouvel objet pour forcer la détection de changement
        this.depensesParTrajet = {...this.depensesParTrajet};
        
        console.log('Dépense ajoutée:', newDepense);
        console.log('Dépenses pour le trajet', trajetId, ':', this.depensesParTrajet[trajetId]);
        
        this.successMessage = 'Dépense ajoutée avec succès.';
        this.closeDepenseModal();
        
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      }
    });
  }
  deleteDepense(depenseId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette dépense ?')) {
      this.depenseService.deleteDepense(depenseId).pipe(
        catchError(error => {
          console.error('Erreur lors de la suppression de la dépense:', error);
          this.errorMessage = 'Erreur lors de la suppression de la dépense. Veuillez réessayer.';
          return of(null);
        })
      ).subscribe(() => {
        // Parcourir tous les trajets pour trouver et supprimer la dépense
        for (const trajetId in this.depensesParTrajet) {
          // Filtrer pour enlever la dépense supprimée
          const depenses = this.depensesParTrajet[trajetId];
          this.depensesParTrajet[trajetId] = depenses.filter(d => d.id !== depenseId);
        }
        
        this.successMessage = 'Dépense supprimée avec succès.';
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      });
    }
  }
}