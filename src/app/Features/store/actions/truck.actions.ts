import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Camion } from '../../../Core/models/camion.model';

export const loadTruck = createAction('[Truck], Load trucks');
export const loadTrucksSuccess = createAction('[Truck] , Load truck success',props<{trucks : Camion[]}>()); 
export const loadTrucksFailure = createAction(
  '[Truck] Load Trucks Failure',
  props<{ error: any }>()
);

export const addTruck = createAction(
  '[Truck] Add Truck',
  props<{ truck: Camion }>()
);
export const addTruckSuccess = createAction(
  '[Truck] Add Truck Success',
  props<{ truck: Camion }>()
);
export const addTruckFailure = createAction(
  '[Truck] Add Truck Failure',
  props<{ error: any }>()
);

export const updateTruck = createAction(
  '[Truck] Update Truck',
  props<{ truck: Camion, id: number }>()
);
export const updateTruckSuccess = createAction(
  '[Truck] Update Truck Success',
  props<{ truck: Camion }>()
);
export const updateTruckFailure = createAction(
  '[Truck] Update Truck Failure',
  props<{ error: any }>()
);

export const deleteTruck = createAction(
  '[Truck] Delete Truck',
  props<{ id: number }>()
);
export const deleteTruckSuccess = createAction(
  '[Truck] Delete Truck Success',
  props<{ id: number }>()
);
export const deleteTruckFailure = createAction(
  '[Truck] Delete Truck Failure',
  props<{ error: any }>()
);
