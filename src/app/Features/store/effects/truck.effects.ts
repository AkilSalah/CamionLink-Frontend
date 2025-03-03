import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { TruckService } from '../../../Core/services/truck.service'; 
import * as TruckActions from '../actions/truck.actions';

@Injectable()
export class TruckEffects {
  constructor(
    private actions$: Actions,
    private truckService: TruckService
  ) {}

  loadTrucks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TruckActions.loadTruck),
      switchMap(() =>
        this.truckService.getTrucks().pipe(
          map(trucks => TruckActions.loadTrucksSuccess({ trucks })),
          catchError(error => of(TruckActions.loadTrucksFailure({ error })))
        )
      )
    )
  );

  addTruck$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TruckActions.addTruck),
      mergeMap(({ truck }) =>
        this.truckService.addTruck(truck).pipe(
          map(newTruck => TruckActions.addTruckSuccess({ truck: newTruck })),
          catchError(error => of(TruckActions.addTruckFailure({ error })))
        )
      )
    )
  );

  updateTruck$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TruckActions.updateTruck),
      mergeMap(({ truck, id }) =>
        this.truckService.updateTruck(truck, id).pipe(
          map(updatedTruck => TruckActions.updateTruckSuccess({ truck: updatedTruck })),
          catchError(error => of(TruckActions.updateTruckFailure({ error })))
        )
      )
    )
  );

  deleteTruck$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TruckActions.deleteTruck),
      mergeMap(({ id }) =>
        this.truckService.deleteTruck(id).pipe(
          map(() => TruckActions.deleteTruckSuccess({ id })),
          catchError(error => of(TruckActions.deleteTruckFailure({ error })))
        )
      )
    )
  );
}