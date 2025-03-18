import { Component } from '@angular/core';
import { Utilisateur } from '../../../Core/models/utilisateur.model';
import { ConducteurService } from '../../../Core/services/conducteur.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  conducteurs : Utilisateur [] = [];

  constructor(private conducteurService : ConducteurService ){}

  ngOnInit(): void {
    this.getConducteurHome()
  }

  getConducteurHome(): void{
    this.conducteurService.getConducteursForHome().subscribe({
      next: (response) => {
        this.conducteurs = response;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des conducteurs :", err);
      }
    });
  } 
}
