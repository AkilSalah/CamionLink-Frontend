import { createReducer, on } from '@ngrx/store';
import { TruckActions } from './truck.actions';

export const truckFeatureKey = 'truck';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
);

