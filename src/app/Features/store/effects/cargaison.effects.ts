import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as CargaisonActions from '../actions/cargaison.actions';
import { CargaisonService } from '../../../Core/services/cargaison.service';

@Injectable()
export class CargaisonEffects {
  constructor(
    private actions$: Actions,
    private cargaisonService: CargaisonService
  ) {}

  loadCargaisons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CargaisonActions.loadCargaisons),
      switchMap(() =>
        this.cargaisonService.getCargaisons().pipe(
          map(cargaisons => CargaisonActions.loadCargaisonsSuccess({ cargaisons })),
          catchError(error => of(CargaisonActions.loadCargaisonsFailure({ error })))
        )
      )
    )
  );

  addCargaison$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CargaisonActions.addCargaison),
      mergeMap(({ cargaison }) =>
        this.cargaisonService.addCargaison(cargaison).pipe(
          map(newCargaison => CargaisonActions.addCargaisonSuccess({ cargaison: newCargaison })),
          catchError(error => of(CargaisonActions.addCargaisonFailure({ error })))
        )
      )
    )
  );

  updateCargaison$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CargaisonActions.updateCargaison),
      mergeMap(({ cargaison, id }) =>
        this.cargaisonService.updateCargaison(cargaison, id).pipe(
          map(updatedCargaison => CargaisonActions.updateCargaisonSuccess({ cargaison: updatedCargaison })),
          catchError(error => of(CargaisonActions.updateCargaisonFailure({ error })))
        )
      )
    )
  );

  deleteCargaison$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CargaisonActions.deleteCargaison),
      mergeMap(({ id }) =>
        this.cargaisonService.deleteCargaison(id).pipe(
          map(() => CargaisonActions.deleteCargaisonSuccess({ id })),
          catchError(error => of(CargaisonActions.deleteCargaisonFailure({ error })))
        )
      )
    )
  );
}