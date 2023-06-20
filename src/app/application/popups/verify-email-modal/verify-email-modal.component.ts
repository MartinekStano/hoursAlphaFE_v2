import { Component, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../service/validation.service';
import { AuthService } from '../../service/auth.service';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-verify-email-modal',
  templateUrl: './verify-email-modal.component.html',
  styleUrls: ['./verify-email-modal.component.scss']
})
export class VerifyEmailModalComponent {

  email: string = '';
  errorMessage: string = '';
  gotThroughMessage: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService,
  ) {  }

  sendEmail(){
    const verifyEmail = this.email;
    console.log('verifyEmail: ', verifyEmail);

    return this.authService.resendVerifyEmail(verifyEmail).subscribe(
      (response) => {
        console.log('resendVerifyEmail: success');
      },
      (error) => {},
    );
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
