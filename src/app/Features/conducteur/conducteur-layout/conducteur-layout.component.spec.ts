import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConducteurLayoutComponent } from './conducteur-layout.component';

describe('ConducteurLayoutComponent', () => {
  let component: ConducteurLayoutComponent;
  let fixture: ComponentFixture<ConducteurLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConducteurLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConducteurLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
