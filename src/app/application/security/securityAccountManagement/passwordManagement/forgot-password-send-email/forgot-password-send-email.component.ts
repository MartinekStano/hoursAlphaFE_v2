import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/application/service/auth.service';
import { ValidationService } from 'src/app/application/service/validation.service';

@Component({
  selector: 'app-forgot-password-send-email',
  templateUrl: './forgot-password-send-email.component.html',
  styleUrls: ['./forgot-password-send-email.component.scss']
})
export class ForgotPasswordSendEmailComponent {

  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private validationService: ValidationService,
  ) { }

  forgotPasswordEmailGroup = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  sendForgotPasswordEmail() {
    console.log(this.forgotPasswordEmailGroup.value);

    const email = this.forgotPasswordEmailGroup.value.email ?? '';

    this.authService.sendForgotPasswordEmail(email).subscribe(() => {
      console.log('sendForgotPasswordEmail success');
    },
    (error) => {
      console.log('sendForgotPasswordEmail error: ', error);
      this.errorMessage = "Email not found!";
    });
  }

  isEmailValidFormat(): boolean {
    const email = this.forgotPasswordEmailGroup.value.email;
    if(email === null || email === undefined){
      return false
    } else {
      return this.validationService.isEmailValid(email);
    }
  }
}
