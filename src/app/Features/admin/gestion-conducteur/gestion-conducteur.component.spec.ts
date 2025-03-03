import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionConducteurComponent } from './gestion-conducteur.component';

describe('GestionConducteurComponent', () => {
  let component: GestionConducteurComponent;
  let fixture: ComponentFixture<GestionConducteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionConducteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionConducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
