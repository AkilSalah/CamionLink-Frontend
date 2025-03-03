import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as TruckActions from '../actions/truck.actions';
import { Camion } from '../../../Core/models/camion.model';

export interface TruckState extends EntityState<Camion> {
  loading: boolean;
  error: any;
}

export const adapter: EntityAdapter<Camion> = createEntityAdapter<Camion>({
  selectId: (truck: Camion) => truck.id
});

export const initialState: TruckState = adapter.getInitialState({
  loading: false,
  error: null
});

export const truckReducer = createReducer(
  initialState,
  on(TruckActions.loadTruck, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TruckActions.loadTrucksSuccess, (state, { trucks }) => 
    adapter.setAll(trucks, {
      ...state,
      loading: false
    })
  ),
  on(TruckActions.loadTrucksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(TruckActions.addTruck, (state) => ({
    ...state,
    loading: true
  })),
  on(TruckActions.addTruckSuccess, (state, { truck }) => 
    adapter.addOne(truck, {
      ...state,
      loading: false
    })
  ),
  on(TruckActions.addTruckFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(TruckActions.updateTruck, (state) => ({
    ...state,
    loading: true
  })),
  on(TruckActions.updateTruckSuccess, (state, { truck }) => 
    adapter.updateOne(
      { id: truck.id, changes: truck },
      {
        ...state,
        loading: false
      }
    )
  ),
  on(TruckActions.updateTruckFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(TruckActions.deleteTruck, (state) => ({
    ...state,
    loading: true
  })),
  on(TruckActions.deleteTruckSuccess, (state, { id }) => 
    adapter.removeOne(id, {
      ...state,
      loading: false
    })
  ),
  on(TruckActions.deleteTruckFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();