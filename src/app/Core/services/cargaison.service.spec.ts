import { TestBed } from '@angular/core/testing';

import { CargaisonService } from './cargaison.service';

describe('CargaisonService', () => {
  let service: CargaisonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaisonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
