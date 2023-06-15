import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AfterRegistrationModalComponent } from '../popups/after-registration-modal/after-registration-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private modalService: NgbModal,
  ) { }

  openAfterRegisterModal() {
    this.modalService.open(AfterRegistrationModalComponent, { centered: true });
  }
}
