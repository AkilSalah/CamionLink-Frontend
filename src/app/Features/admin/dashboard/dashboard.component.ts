import { Component } from '@angular/core';
import { CargaisonService } from '../../../Core/services/cargaison.service';
import { ConducteurService } from '../../../Core/services/conducteur.service';
import { TrajetService } from '../../../Core/services/trajet.service';
import { TruckService } from '../../../Core/services/truck.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  camionCount: number = 0;
  cargaisonCount: number = 0;
  trajetCount: number = 0;
  conducteurCount: number = 0;
  trajetsByConducteur : any[] = [];

  constructor(
    private truckService: TruckService,
    private cargaisonService: CargaisonService,
    private conducteurService: ConducteurService,
    private trajetService: TrajetService
  ) {}

  ngOnInit(): void {
    this.getCamionCount();
    this.getCargaisonCount();
    this.getTrajetCount();
    this.getConducteurCount();
    this.getConducteurTrajetStats();
  }

  getCamionCount() {
    this.truckService.getTrucksCount().subscribe({
      next: response => {
        this.camionCount = response;
      },
      error: error => {
        console.error("Erreur lors de la récupération du nombre de camions", error);
      },
    });
  }

  getCargaisonCount() {
    this.cargaisonService.getCargaisonsCount().subscribe({
      next: response => {
        this.cargaisonCount = response;
      },
      error: error => {
        console.error("Erreur lors de la récupération du nombre de cargaisons", error);
      },
    });
  }

  getTrajetCount() {
    this.trajetService.getTrajetCount().subscribe({
      next: response => {
        this.trajetCount = response;
      },
      error: error => {
        console.error("Erreur lors de la récupération du nombre de trajets", error);
      },
    });
  }

  getConducteurCount() {
    this.conducteurService.getConducteursCount().subscribe({
      next: response => {
        this.conducteurCount = response;
      },
      error: error => {
        console.error("Erreur lors de la récupération du nombre de conducteurs", error);
      },
    });
  }

  getConducteurTrajetStats() : void{
    this.trajetService.getConducteurTrajetStats().subscribe({
      next : response => {
        this.trajetsByConducteur = response
      },
      error: error => {
        console.error("Erreur lors de la récupération du nombre de trajets par un conducteur", error);
      },
    })
  }

}
