import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkDayPopupComponent } from './edit-work-day-popup.component';

describe('EditWorkDayPopupComponent', () => {
  let component: EditWorkDayPopupComponent;
  let fixture: ComponentFixture<EditWorkDayPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWorkDayPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWorkDayPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
