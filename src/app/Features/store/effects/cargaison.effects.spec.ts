import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CargaisonEffects } from './cargaison.effects';

describe('CargaisonEffects', () => {
  let actions$: Observable<any>;
  let effects: CargaisonEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CargaisonEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CargaisonEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
