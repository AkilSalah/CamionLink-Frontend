import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TruckEffects } from './truck.effects';

describe('TruckEffects', () => {
  let actions$: Observable<any>;
  let effects: TruckEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TruckEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TruckEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
