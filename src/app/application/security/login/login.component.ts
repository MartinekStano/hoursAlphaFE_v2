import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../service/validation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VerifyEmailModalComponent } from '../../popups/verify-email-modal/verify-email-modal.component';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hide: boolean = true;

  errorMessage: string = '';

  loginGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private validationService: ValidationService,
    private modalService: NgbModal,
    private router: Router,
    private authService: AuthService,
    
  ) { }

  login(): void {
    if(this.loginGroup.valid) {
      const email = this.loginGroup.value.email ?? '';
      const password = this.loginGroup.value.password ?? '';

      this.authService.login(email, password).subscribe(
        () => {
          this.router.navigateByUrl('/employee-panel');
          console.log("Login successful");
        },
        (error) => {
          if (error.status === 401) {
            this.errorMessage = 'Bad credentials';
            console.log("Bad credentials");
          } else {
            this.errorMessage = 'Something went wrong';
            console.log("Something went wrong");
          }
        }
      );
    }
  }

  isEmailValidFormat(): boolean {
    const email = this.loginGroup.value.email;
    if(email === null || email === undefined){
      return false
    } else {
      return this.validationService.isEmailValid(email);
    }
  }

  openModal() {
		this.modalService.open(VerifyEmailModalComponent);
	}
}
