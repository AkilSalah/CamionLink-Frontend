import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCargaison from '../reducers/cargaison.reducer';

export const selectCargaisonState = createFeatureSelector<fromCargaison.CargaisonState>('cargaisons');

export const selectAllCargaison = createSelector(
  selectCargaisonState,
  fromCargaison.selectAll
);

export const selectCargaisonEntities = createSelector(
  selectCargaisonState,
  fromCargaison.selectEntities
);

export const selectCargaisonLoading = createSelector(
  selectCargaisonState,
  state => state.loading
);

export const selectCargaisonError = createSelector(
  selectCargaisonState,
  state => state.error
);

export const selectCargaisonById = (id: number) => createSelector(
  selectCargaisonEntities,
  entities => entities[id]
);