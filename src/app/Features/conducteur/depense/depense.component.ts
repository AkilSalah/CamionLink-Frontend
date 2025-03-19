import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Depense } from '../../../Core/models/depense.model';
import { DepenseService } from '../../../Core/services/depense.service';
import { catchError, EMPTY, finalize, of } from 'rxjs';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrl: './depense.component.css'
})

export class DepenseComponent {
  @Input() trajetId: number | null = null;
  @Input() depenses: Depense[] = [];
  @Input() trajetStatut = "" 
  @Output() depensesChange = new EventEmitter<Depense[]>();
  @Output() successMessage = new EventEmitter<string>();
  @Output() errorMessage = new EventEmitter<string>();

  showDepenseModal = false;
  isSubmittingDepense = false;
  nouvelleDepense: Depense = this.getEmptyDepense();

  constructor(private depenseService: DepenseService) {}

  getEmptyDepense(): Depense {
    return {
      id: 0,
      typeDepense: '',
      montant: 0,
      date: new Date().toISOString().split('T')[0],
      trajetId: this.trajetId || 0,
      statut: 'EN_ATTENTE'
    };
  }

  openDepenseModal(): void {
    this.nouvelleDepense = this.getEmptyDepense();
    this.nouvelleDepense.trajetId = this.trajetId || 0;
    this.showDepenseModal = true;
  }
  
  isTrajetTermine(): boolean {
    return this.trajetStatut === "TERMINE"
  }
  
  closeDepenseModal(): void {
    this.showDepenseModal = false;
    this.errorMessage.emit();
  }
  
  ajouterDepense(): void {
    if (!this.nouvelleDepense.typeDepense || !this.nouvelleDepense.date || this.nouvelleDepense.montant <= 0) {
      this.errorMessage.emit('Veuillez remplir tous les champs correctement.');
      return;
    }
    
    this.nouvelleDepense.montant = Number(this.nouvelleDepense.montant);
    
    if (!this.trajetId) {
      this.errorMessage.emit('ID du trajet non défini.');
      return;
    }
    
    this.nouvelleDepense.trajetId = this.trajetId;
    
    this.isSubmittingDepense = true;
    this.errorMessage.emit();
    
    this.depenseService.addDepense(this.nouvelleDepense).pipe(
      catchError(error => {
        console.error('Erreur lors de l\'ajout de la dépense:', error);
        this.errorMessage.emit('Erreur lors de l\'ajout de la dépense: ' + 
          (error.error?.message || error.message || 'Veuillez vérifier les données saisies.'));
        return EMPTY;
      }),
      finalize(() => {
        this.isSubmittingDepense = false;
      })
    ).subscribe(newDepense => {
      const updatedDepenses = [...this.depenses, newDepense];
      this.depensesChange.emit(updatedDepenses);
      
      this.successMessage.emit('Dépense ajoutée avec succès.');
      
      this.closeDepenseModal();
    });
  }

  deleteDepense(depenseId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette dépense ?')) {
      this.depenseService.deleteDepense(depenseId).pipe(
        catchError(error => {
          console.error('Erreur lors de la suppression de la dépense:', error);
          this.errorMessage.emit('Erreur lors de la suppression de la dépense. Veuillez réessayer.');
          return of(null);
        })
      ).subscribe(() => {
        const updatedDepenses = this.depenses.filter(d => d.id !== depenseId);
        this.depensesChange.emit(updatedDepenses);
        
        this.successMessage.emit('Dépense supprimée avec succès.');
      });
    }
  }
}