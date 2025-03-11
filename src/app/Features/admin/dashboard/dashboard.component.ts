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
  camionCount : number = 0;
  cargaisonCount : number = 0; 
  trajetCount : number = 0;
  conducteurCount : number = 0;

  constructor(private truckService : TruckService, private cargaisonService: CargaisonService,
    private conducteurService: ConducteurService , private trajetService : TrajetService
  ){}

  ngOnInit(): void {
   this.getCamionCount();
    
  }

  getCamionCount(){
    this.truckService.getTrucksCount().subscribe({
      next : response => {
        this.camionCount = response
      },
      error : error => {
        console.log("error lors de la recuperation de nombre des camions")
      },
    })
  }

}
