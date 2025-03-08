import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepenseManagementComponent } from './depense-management.component';

describe('DepenseManagementComponent', () => {
  let component: DepenseManagementComponent;
  let fixture: ComponentFixture<DepenseManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepenseManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepenseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
