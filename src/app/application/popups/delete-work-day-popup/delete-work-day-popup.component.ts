import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-work-day-popup',
  templateUrl: './delete-work-day-popup.component.html',
  styleUrls: ['./delete-work-day-popup.component.scss']
})
export class DeleteWorkDayPopupComponent {

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {}

  deleteWorkDay() {

  }
}