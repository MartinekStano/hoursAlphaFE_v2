import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDocumentsComponent } from './employee-documents.component';

describe('EmployeeDocumentsComponent', () => {
  let component: EmployeeDocumentsComponent;
  let fixture: ComponentFixture<EmployeeDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
