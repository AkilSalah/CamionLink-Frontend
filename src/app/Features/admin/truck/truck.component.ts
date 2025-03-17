import { Component, OnInit, OnDestroy } from '@angular/core';
import { catchError, finalize } from 'rxjs';
import { Camion, TruckStatus } from '../../../Core/models/camion.model';
import { Store } from '@ngrx/store';
import * as TruckActions from '../../store/actions/truck.actions';
import * as TruckSelectors from '../../store/selectors/truck.selectors';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.css']
})
export class TruckComponent implements OnInit {
  
  trucks: Camion[] = [];
  trucksFiltres: Camion[] = [];
  loading: boolean = false;
  error: any = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  
  showModal: boolean = false;
  isEditMode: boolean = false;
  currentTruck: Camion = {
    id: 0,
    marque: '',
    modele: '',
    annee: new Date(),
    etat: 'DISPONIBLE'
  };
  
  filtreEtat: TruckStatus | 'TOUS' = 'TOUS';
  searchTerm = "";

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loadTrucks();
  }

  loadTrucks(): void {
    this.loading = true;
    this.store.dispatch(TruckActions.loadTrucks());
    
    this.store.select(TruckSelectors.selectAllTrucks)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du chargement des camions:', error);
          this.errorMessage = 'Erreur lors du chargement des camions. Veuillez réessayer.';
          return [];
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(trucks => {
        this.trucks = trucks;
        this.appliquerFiltres();
        this.successMessage = 'Camions chargés avec succès.';
        setTimeout(() => this.successMessage = null, 3000);
      });
      
    this.store.select(TruckSelectors.selectTruckLoading)
      .subscribe(loading => {
        this.loading = loading;
      });
      
    this.store.select(TruckSelectors.selectTruckError)
      .subscribe(error => {
        if (error) {
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
          setTimeout(() => this.errorMessage = null, 5000);
        }
      });
  }

  appliquerFiltres(): void {
    if (!this.trucks) {
      this.trucksFiltres = [];
      return;
    }

    let resultat = [...this.trucks];

    if (this.filtreEtat !== 'TOUS') {
      resultat = resultat.filter((truck) => truck.etat === this.filtreEtat);
    }

    if (this.searchTerm?.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      resultat = resultat.filter(
        (truck) =>
          truck.marque.toLowerCase().includes(searchLower) ||
          truck.modele.toLowerCase().includes(searchLower) 
      );
    }

    this.trucksFiltres = resultat;
  }

  onFiltreChange(): void {
    this.appliquerFiltres();
  }

  onSearchChange(): void {
    this.appliquerFiltres();
  }

  resetFiltres(): void {
    this.filtreEtat = 'TOUS';
    this.searchTerm = '';
    this.appliquerFiltres();
  }

  editTruck(truck: Camion): void {
    this.isEditMode = true;
    this.currentTruck = { ...truck };
    this.openModal();
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.isEditMode = false;
    this.currentTruck = {
      id: 0,
      marque: '',
      modele: '',
      annee: new Date(),
      etat: 'DISPONIBLE'
    };
  }

  addTruck(): void {
    this.store.dispatch(TruckActions.addTruck({ truck: this.currentTruck }));
    this.closeModal();
    this.successMessage = 'Camion ajouté avec succès.';
    setTimeout(() => this.successMessage = null, 3000);
  }

  updateTruck(): void {
    this.store.dispatch(TruckActions.updateTruck({ truck: this.currentTruck, id: this.currentTruck.id }));
    this.closeModal();
    this.successMessage = 'Camion mis à jour avec succès.';
    setTimeout(() => this.successMessage = null, 3000);
  }

  deleteTruck(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce camion ?')) {
      this.store.dispatch(TruckActions.deleteTruck({ id }));
      this.successMessage = 'Camion supprimé avec succès.';
      setTimeout(() => this.successMessage = null, 3000);
    }
  }
}