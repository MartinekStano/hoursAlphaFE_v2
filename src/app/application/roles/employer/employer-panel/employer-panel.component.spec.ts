import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerPanelComponent } from './employer-panel.component';

describe('EmployerPanelComponent', () => {
  let component: EmployerPanelComponent;
  let fixture: ComponentFixture<EmployerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
