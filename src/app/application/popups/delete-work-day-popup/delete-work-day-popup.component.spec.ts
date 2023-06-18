import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWorkDayPopupComponent } from './delete-work-day-popup.component';

describe('DeleteWorkDayPopupComponent', () => {
  let component: DeleteWorkDayPopupComponent;
  let fixture: ComponentFixture<DeleteWorkDayPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteWorkDayPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteWorkDayPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
