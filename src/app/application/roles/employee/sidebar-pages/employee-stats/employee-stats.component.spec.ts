import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeStatsComponent } from './employee-stats.component';

describe('EmployeeStatsComponent', () => {
  let component: EmployeeStatsComponent;
  let fixture: ComponentFixture<EmployeeStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
