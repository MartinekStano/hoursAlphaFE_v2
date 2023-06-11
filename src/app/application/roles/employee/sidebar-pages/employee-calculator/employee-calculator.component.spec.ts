import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCalculatorComponent } from './employee-calculator.component';

describe('EmployeeCalculatorComponent', () => {
  let component: EmployeeCalculatorComponent;
  let fixture: ComponentFixture<EmployeeCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
