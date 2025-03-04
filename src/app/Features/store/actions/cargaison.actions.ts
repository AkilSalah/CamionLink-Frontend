import { createAction, props } from '@ngrx/store';
import { Cargaison } from '../../../Core/models/cargaison.model';

export const loadCargaisons = createAction('[Cargaison] Load Cargaisons');
export const loadCargaisonsSuccess = createAction(
  '[Cargaison] Load Cargaisons Success',
  props<{ cargaisons: Cargaison[] }>()
);
export const loadCargaisonsFailure = createAction(
  '[Cargaison] Load Cargaisons Failure',
  props<{ error: any }>()
);

export const addCargaison = createAction(
  '[Cargaison] Add Cargaison',
  props<{ cargaison: Cargaison }>()
);
export const addCargaisonSuccess = createAction(
  '[Cargaison] Add Cargaison Success',
  props<{ cargaison: Cargaison }>()
);
export const addCargaisonFailure = createAction(
  '[Cargaison] Add Cargaison Failure',
  props<{ error: any }>()
);

export const updateCargaison = createAction(
  '[Cargaison] Update Cargaison',
  props<{ cargaison: Cargaison, id: number }>()
);
export const updateCargaisonSuccess = createAction(
  '[Cargaison] Update Cargaison Success',
  props<{ cargaison: Cargaison }>()
);
export const updateCargaisonFailure = createAction(
  '[Cargaison] Update Cargaison Failure',
  props<{ error: any }>()
);

export const deleteCargaison = createAction(
  '[Cargaison] Delete Cargaison',
  props<{ id: number }>()
);
export const deleteCargaisonSuccess = createAction(
  '[Cargaison] Delete Cargaison Success',
  props<{ id: number }>()
);
export const deleteCargaisonFailure = createAction(
  '[Cargaison] Delete Cargaison Failure',
  props<{ error: any }>()
);