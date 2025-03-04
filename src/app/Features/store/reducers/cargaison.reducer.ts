import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Cargaison } from '../../../Core/models/cargaison.model';
import { createReducer, on } from '@ngrx/store';
import * as CargaisonActions from '../actions/cargaison.actions';

export interface CargaisonState extends EntityState<Cargaison> {
  loading: boolean;
  error: any;
}

export const adapter: EntityAdapter<Cargaison> = createEntityAdapter<Cargaison>({
  selectId: (cargaison: Cargaison) => cargaison.id
});

export const initialState: CargaisonState = adapter.getInitialState({
  loading: false,
  error: null
});

export const cargaisonReducer = createReducer(
  initialState,

  on(CargaisonActions.loadCargaisons, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CargaisonActions.loadCargaisonsSuccess, (state, { cargaisons }) =>
    adapter.setAll(cargaisons, {
      ...state,
      loading: false
    })
  ),
  on(CargaisonActions.loadCargaisonsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(CargaisonActions.addCargaison, (state) => ({
    ...state,
    loading: true
  })),
  on(CargaisonActions.addCargaisonSuccess, (state, { cargaison }) =>
    adapter.addOne(cargaison, {
      ...state,
      loading: false
    })
  ),
  on(CargaisonActions.addCargaisonFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(CargaisonActions.updateCargaison, (state) => ({
    ...state,
    loading: true
  })),
  on(CargaisonActions.updateCargaisonSuccess, (state, { cargaison }) =>
    adapter.updateOne(
      { id: cargaison.id, changes: cargaison },
      {
        ...state,
        loading: false
      }
    )
  ),
  on(CargaisonActions.updateCargaisonFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(CargaisonActions.deleteCargaison, (state) => ({
    ...state,
    loading: true
  })),
  on(CargaisonActions.deleteCargaisonSuccess, (state, { id }) =>
    adapter.removeOne(id, {
      ...state,
      loading: false
    })
  ),
  on(CargaisonActions.deleteCargaisonFailure, (state, { error }) => ({
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