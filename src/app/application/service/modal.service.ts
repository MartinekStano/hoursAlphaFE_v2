import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AfterRegistrationModalComponent } from '../popups/after-registration-modal/after-registration-modal.component';
import { DeleteAccountModalComponent } from '../popups/delete-account-modal/delete-account-modal.component';
import { AddHoursPopupComponent } from '../popups/add-hours-popup/add-hours-popup.component';
import { DeleteWorkDayPopupComponent } from '../popups/delete-work-day-popup/delete-work-day-popup.component';
import { EditWorkDayPopupComponent } from '../popups/edit-work-day-popup/edit-work-day-popup.component';

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

  openDeleteAccountModal() {
    this.modalService.open(DeleteAccountModalComponent, { centered: true });
  }

  openAddHoursModal() {
    this.modalService.open(AddHoursPopupComponent, { size: 'xl' });
  }

  openDeleteWorkDayModal() {
    this.modalService.open(DeleteWorkDayPopupComponent);
  }

  openEditWorkDayModal() {
    this.modalService.open(EditWorkDayPopupComponent, { size: 'xl'});
  }
}
