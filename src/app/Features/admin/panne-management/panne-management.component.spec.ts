import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanneManagementComponent } from './panne-management.component';

describe('PanneManagementComponent', () => {
  let component: PanneManagementComponent;
  let fixture: ComponentFixture<PanneManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanneManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanneManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
