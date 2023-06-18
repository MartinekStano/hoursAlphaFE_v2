import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHoursPopupComponent } from './add-hours-popup.component';

describe('AddHoursPopupComponent', () => {
  let component: AddHoursPopupComponent;
  let fixture: ComponentFixture<AddHoursPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHoursPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHoursPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
