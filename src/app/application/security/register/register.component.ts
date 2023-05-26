import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../service/validation.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { VerifyEmailModalComponent } from '../../popups/verify-email-modal/verify-email-modal.component';
import { AuthService } from '../../service/auth.service';
import { AfterRegistrationModalComponent } from '../../popups/after-registration-modal/after-registration-modal.component';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  hide: boolean = true;
  hide2: boolean = true;

  errorMessage: string = '';

  roleButtonValue = 'Select Role';
  registerGroup = new FormGroup({
    role: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordCheck: new FormControl('', Validators.required),
    termsAccepted: new FormControl('', Validators.required),
  });

  constructor(
    private validationService: ValidationService,
    private modalService: NgbModal, 
    private authService: AuthService,
    
  ) { }

  ngOnInit(): void {

  }

  selectRole(event: Event, role: string) {
    event.preventDefault();
    this.registerGroup.get('role')?.setValue(role);
    this.roleButtonValue = role;
  }

  register() {
    if (this.registerGroup.valid) {
      console.log(this.registerGroup.value);
  
      const role = this.registerGroup.value.role ?? '';
      const firstName = this.registerGroup.value.firstName ?? '';
      const lastName = this.registerGroup.value.lastName ?? '';
      const email = this.registerGroup.value.email ?? '';
      const password = this.registerGroup.value.password ?? '';
  
      this.authService.register(role, firstName, lastName, email, password)
        .pipe(
          tap(() => this.modalService.open(AfterRegistrationModalComponent)),
          catchError((error) => {
            if (error.status === 401) {
              this.errorMessage = 'User with this E-Mail already exists!';
              console.log("User with this E-Mail already exists!");
            }
            return throwError(error);
          })
        )
    }
  }
  

  passwordsMatch(){
    if(this.registerGroup.value.password === this.registerGroup.value.passwordCheck){
      return true;
    } else {
      return false;
    }
  }

  invalidPasswordLenght(): boolean {
    const password = this.registerGroup.value.password;
    return password ? password.length >= 8 : true;
  }

  invalidPasswordFormat(): boolean {
    const password = this.registerGroup.value.password;
    const numberRegex = /\d/;

    return password ? numberRegex.test(password) : true;
  }

  isEmailValidFormat(): boolean {
    const email = this.registerGroup.value.email;
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
