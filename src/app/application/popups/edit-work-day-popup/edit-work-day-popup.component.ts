import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-work-day-popup',
  templateUrl: './edit-work-day-popup.component.html',
  styleUrls: ['./edit-work-day-popup.component.scss']
})
export class EditWorkDayPopupComponent {

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  editWorkDay() {
    
  }
}
