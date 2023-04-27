import { Component, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../service/validation.service';

@Component({
  selector: 'app-verify-email-modal',
  templateUrl: './verify-email-modal.component.html',
  styleUrls: ['./verify-email-modal.component.scss']
})
export class VerifyEmailModalComponent {

  email: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
  ) {  }

  sendEmail(){
    console.log('email');

    
  }

  isEmailValidFormat(): boolean {
    const email = this.email;
    if(email === null || email === undefined){
      return false
    } else {
      return this.validationService.isEmailValid(email);
    }
  }

  isEmailNull(): boolean {
    if(this.email.trim().length === 0){
      return false;
    } else {
      return true;
    }
  }
}
