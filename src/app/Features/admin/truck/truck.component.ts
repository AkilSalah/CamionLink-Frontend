import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Camion } from '../../../Core/models/camion.model';
import { Store } from '@ngrx/store';
import * as TruckActions from '../../store/actions/truck.actions';
import * as TruckSelectors from '../../store/selectors/truck.selectors';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.css']
})
export class TruckComponent implements OnInit {
  
  trucks$: Observable<Camion[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  showModal: boolean = false;
  isEditMode: boolean = false;
  currentTruck: Camion = {
    id: 0,
    marque: '',
    modele: '',
    annee: new Date,
    etat: 'DISPONIBLE'
  };

  constructor(private store: Store) {
    this.trucks$ = this.store.select(TruckSelectors.selectAllTrucks);
    this.loading$ = this.store.select(TruckSelectors.selectTruckLoading);
    this.error$ = this.store.select(TruckSelectors.selectTruckError);
  }

  ngOnInit(): void {
    this.loadTrucks();
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
      annee: new Date,
      etat: 'DISPONIBLE'
    };
  }

  loadTrucks(): void {
    this.store.dispatch(TruckActions.loadTrucks());
  }

  editTruck(truck: Camion): void {
    this.isEditMode = true;
    this.currentTruck = { ...truck };
    this.openModal();
  }

  addTruck(): void {
    this.store.dispatch(TruckActions.addTruck({ truck: this.currentTruck }));
    this.closeModal();
  }

  updateTruck(): void {
    this.store.dispatch(TruckActions.updateTruck({ truck: this.currentTruck, id: this.currentTruck.id }));
    this.closeModal();
  }

  deleteTruck(id: number): void {
    if (confirm('Are you sure you want to delete this truck?')) {
      this.store.dispatch(TruckActions.deleteTruck({ id }));
    }
  }
    
}