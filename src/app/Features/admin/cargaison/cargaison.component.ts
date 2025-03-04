import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cargaison } from '../../../Core/models/cargaison.model';
import { Store } from '@ngrx/store';
import * as CargaisonActions from '../../store/actions/cargaison.actions';
import * as CargaisonSelectors from '../../store/selectors/cargaison.selectors';
import { CargaisonService } from '../../../Core/services/cargaison.service';

@Component({
  selector: 'app-cargaison',
  templateUrl: './cargaison.component.html',
  styleUrls: ['./cargaison.component.css']
})
export class CargaisonComponent implements OnInit {
  cargaisons$: Observable<Cargaison[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  showModal: boolean = false;
  isEditMode: boolean = false;
  currentCargaison: Cargaison = {
    id: 0,
    description: '',
    poids: 0,
    type: 'STANDARD'
  };

  constructor(private store: Store, private carServ: CargaisonService) {
    this.cargaisons$ = this.store.select(CargaisonSelectors.selectAllCargaison);
    this.loading$ = this.store.select(CargaisonSelectors.selectCargaisonLoading);
    this.error$ = this.store.select(CargaisonSelectors.selectCargaisonError);
  }

  ngOnInit(): void {
    this.loadCargaisons();
    this.loadCar()
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.isEditMode = false;
    this.currentCargaison = {
      id: 0,
      description: '',
      poids: 0,
      type: 'STANDARD'
    };
  }

  loadCargaisons(): void {
    this.store.dispatch(CargaisonActions.loadCargaisons());
  }

  loadCar(){
    this.carServ.getCargaisons().subscribe({
      next : response => {
        console.log(response)
      }
    })
  }

  editCargaison(cargaison: Cargaison): void {
    this.isEditMode = true;
    this.currentCargaison = { ...cargaison };
    this.openModal();
  }

  addCargaison(): void {
    this.store.dispatch(CargaisonActions.addCargaison({ cargaison: this.currentCargaison }));
    this.closeModal();
  }

  updateCargaison(): void {
    this.store.dispatch(CargaisonActions.updateCargaison({ cargaison: this.currentCargaison, id: this.currentCargaison.id }));
    this.closeModal();
  }

  deleteCargaison(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette cargaison ?')) {
      this.store.dispatch(CargaisonActions.deleteCargaison({ id }));
    }
  }
}