import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Panne } from '../../../Core/models/panne.model';
import { PanneService } from '../../../Core/services/panne.service';
import { catchError, EMPTY, finalize, of } from 'rxjs';

@Component({
  selector: 'app-panne',
  templateUrl: './panne.component.html',
  styleUrl: './panne.component.css'
})
export class PanneComponent {
  @Input() trajetId : number | null = null;
  @Input() pannes : Panne [] = [];
  @Output() panneChange = new EventEmitter<Panne[]>();
  @Output() successMessage = new EventEmitter<string>();
  @Output() errorMessage = new EventEmitter<string>();

  showPanneModal = false;
  isSubmittingPannes = false;
  nouvellePanne : Panne = this.getEmptyPannes();

  constructor(private panneService : PanneService){}
  getEmptyPannes(): Panne {
    return {
    id : 0,
    datePanne : new Date().toISOString().split('T')[0],
    description : '',
    trajetId: this.trajetId || 0,
    urgence : 'IMMEDIATE' 
    }
  }
  openDepenseModal(): void {
    this.nouvellePanne = this.getEmptyPannes();
    this.nouvellePanne.trajetId = this.trajetId || 0;
    this.showPanneModal = true;
  }
  closeModal() : void {
    this.showPanneModal = false;
    this.errorMessage.emit();
  }

  ajouterPanne() : void {
    if(!this.nouvellePanne.datePanne || !this.nouvellePanne.description || !this.nouvellePanne.urgence ){
      this.errorMessage.emit('Veuillez remplir tous les champs correctement.');
      return
    }
    if(!this.trajetId){
      this.errorMessage.emit('ID du trajet non défini.');
      return;
    }
    this.nouvellePanne.trajetId = this.trajetId;
    this.isSubmittingPannes = true;
    this.errorMessage.emit();
    this.panneService.createPanne(this.nouvellePanne).pipe(
      catchError(error => {
        console.error('Erreur lors de l\'ajout de la panne:', error);
        this.errorMessage.emit('Erreur lors de l\'ajout de la panne: ' + 
          (error.error?.message || error.message || 'Veuillez vérifier les données saisies.'));
        return EMPTY;
      }),
      finalize(() =>{
        this.isSubmittingPannes = false;
      })
    ).subscribe(newPanne =>{
      const updatedPanne = [...this.pannes,newPanne];
      this.panneChange.emit(updatedPanne);
      this.successMessage.emit('Panne ajoutée avec succès.');
      
      this.closeModal();
    })
  }

  deletePanne(panneId : number){
    if (confirm('Êtes-vous sûr de vouloir supprimer cette panne ?')){
      this.panneService.deletePanne(panneId).pipe(
        catchError(error =>{
          console.error('Erreur lors de la suppression de la dépense:', error);
          this.errorMessage.emit('Erreur lors de la suppression de la panne. Veuillez réessayer.');
          return of(null);
        })
      ).subscribe(()=>{
        const updatedPanne = this.pannes.filter(p => p.id !== panneId)
        this.panneChange.emit(updatedPanne)
        this.successMessage.emit('Panne supprimée avec succès.');
      })
    }
  }



}
