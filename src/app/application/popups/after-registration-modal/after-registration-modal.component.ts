import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-after-registration-modal',
  templateUrl: './after-registration-modal.component.html',
  styleUrls: ['./after-registration-modal.component.scss']
})
export class AfterRegistrationModalComponent {

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }
}
