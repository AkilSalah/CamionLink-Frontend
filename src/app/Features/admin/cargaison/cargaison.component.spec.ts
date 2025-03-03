import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaisonComponent } from './cargaison.component';

describe('CargaisonComponent', () => {
  let component: CargaisonComponent;
  let fixture: ComponentFixture<CargaisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CargaisonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargaisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
