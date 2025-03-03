import { Component } from '@angular/core';
import { ConducteurService } from '../../../Core/services/conducteur.service';
import { Utilisateur } from '../../../Core/models/utilisateur.model';

@Component({
  selector: 'app-gestion-conducteur',
  templateUrl: './gestion-conducteur.component.html',
  styleUrl: './gestion-conducteur.component.css'
})

export class GestionConducteurComponent {
  conducteurs : Utilisateur[] = [];

  constructor (private conducteurService : ConducteurService){}
  ngOnInit(): void {
    this.loadConducteurs() ;
  }

  loadConducteurs(){
    this.conducteurService.getConducteurs().subscribe({
      next : (response) =>{
        console.log(response)
        this.conducteurs = response;
      },
      error : (err) => {
          console.error('Erreur lors du chargement des conducteurs', err);
      }
    })
  }
  deleteConducteur(id: number) {
    if(confirm('Are you sure you want to delete this')){
       this.conducteurService.deleteConducteurs(id).subscribe({
      next: () => {
        this.conducteurs = this.conducteurs.filter(conducteur => conducteur.id !== id);
        console.log('Conducteur supprimé avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du conducteur', err);
      }
    });
    }
   
  }
}
