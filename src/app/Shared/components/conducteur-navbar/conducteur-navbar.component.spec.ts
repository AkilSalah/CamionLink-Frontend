import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConducteurNavbarComponent } from './conducteur-navbar.component';

describe('ConducteurNavbarComponent', () => {
  let component: ConducteurNavbarComponent;
  let fixture: ComponentFixture<ConducteurNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConducteurNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConducteurNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
