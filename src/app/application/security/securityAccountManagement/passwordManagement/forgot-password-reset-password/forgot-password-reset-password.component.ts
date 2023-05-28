import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VerifyEmailModalComponent } from 'src/app/application/popups/verify-email-modal/verify-email-modal.component';
import { AuthService } from 'src/app/application/service/auth.service';

@Component({
  selector: 'app-forgot-password-reset-password',
  templateUrl: './forgot-password-reset-password.component.html',
  styleUrls: ['./forgot-password-reset-password.component.scss']
})
export class ForgotPasswordResetPasswordComponent {

  hide: boolean = true;
  hide2: boolean = true;

  errorMessage: string = '';

  verificationToken: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {
    this.verificationToken = String(this.route.snapshot.paramMap.get('code'));
  }

  forgotPasswordGroup = new FormGroup({
    password: new FormControl('', Validators.required),
    passwordCheck: new FormControl('', Validators.required),
  });

  resetForgotPassword() {
    console.log(this.forgotPasswordGroup.value);

    const password = this.forgotPasswordGroup.value.password ?? '';

    this.authService.resetPassword(password, this.verificationToken).subscribe(() => {
      console.log('resetPassword success');
      this.router.navigateByUrl('/main_dashboard');
    },
    (error) => {
      if(error == 401) {
        console.log('Bad credentials');
      } 
      else if(error == 403) {
        console.log('User is not verified');
      }
    });
  }

  passwordsMatch(){
    if(this.forgotPasswordGroup.value.password === this.forgotPasswordGroup.value.passwordCheck){
      return true;
    } else {
      return false;
    }
  }

  invalidPasswordLenght(): boolean {
    const password = this.forgotPasswordGroup.value.password;
    return password ? password.length >= 8 : true;
  }

  invalidPasswordFormat(): boolean {
    const password = this.forgotPasswordGroup.value.password;
    const numberRegex = /\d/;

    return password ? numberRegex.test(password) : true;
  }

  openModal() {
		this.modalService.open(VerifyEmailModalComponent);
	}

}
