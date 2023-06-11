import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSidenavComponent } from './employee-sidenav.component';

describe('EmployeeSidenavComponent', () => {
  let component: EmployeeSidenavComponent;
  let fixture: ComponentFixture<EmployeeSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeSidenavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
