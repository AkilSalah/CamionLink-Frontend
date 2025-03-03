import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTruck from '../reducers/truck.reducer';

export const selectTruckState = createFeatureSelector<fromTruck.TruckState>('trucks');

export const selectAllTrucks = createSelector(
  selectTruckState,
  fromTruck.selectAll
);

export const selectTruckEntities = createSelector(
  selectTruckState,
  fromTruck.selectEntities
);

export const selectTruckLoading = createSelector(
  selectTruckState,
  state => state.loading
);

export const selectTruckError = createSelector(
  selectTruckState,
  state => state.error
);

export const selectTruckById = (id: number) => createSelector(
  selectTruckEntities,
  entities => entities[id]
);