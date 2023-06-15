import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../service/validation.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { VerifyEmailModalComponent } from '../../popups/verify-email-modal/verify-email-modal.component';
import { AuthService } from '../../service/auth.service';
import { AfterRegistrationModalComponent } from '../../popups/after-registration-modal/after-registration-modal.component';
import { catchError, tap, throwError } from 'rxjs';
import { ModalService } from '../../service/modal.service';

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
    // role: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordCheck: new FormControl('', Validators.required),
    termsAccepted: new FormControl('', Validators.required),
  });

  constructor(
    private validationService: ValidationService,
    private modal: NgbModal, 
    private authService: AuthService,
    private modalService: ModalService,
    
  ) { }

  ngOnInit(): void {
  }

  // selectRole(event: Event, role: string) {
  //   event.preventDefault();
  //   this.registerGroup.get('role')?.setValue(role);
  //   this.roleButtonValue = role;
  // }

  register() {
    if (this.registerGroup.valid) {
      console.log(this.registerGroup.value);
  
      // const role = this.registerGroup.value.role ?? '';
      const firstName = this.registerGroup.value.firstName ?? '';
      const lastName = this.registerGroup.value.lastName ?? '';
      const email = this.registerGroup.value.email ?? '';
      const phoneNumber = this.registerGroup.value.phoneNumber ?? '';
      const password = this.registerGroup.value.password ?? '';
  
      this.authService.register(firstName, lastName, email, phoneNumber, password).subscribe(
        () => 
        // this.modalService.openAfterRegisterModal(),
        console.log('success'),
        (error) => {
          console.log('something went wrong');
          if (error.status === 401) {
            this.errorMessage = 'Something went wrong!';
          }
        }
      );
    }
  }

  // register() {
  //   if(this.registerGroup.valid){
  //     const firstName = this.registerGroup.value.firstName;
  //     const lastName = this.registerGroup.value.lastName;
  //     const email = this.registerGroup.value.email;
  //     const password = this.registerGroup.value.password;
  //     console.log(this.registerGroup.value);
    
  //     this.authService.register(firstName, lastName, email, password)  
  //       .subscribe(
  //         () => this.authService.showRegisterVerifyDialog(),
  //         (error) => {
  //           if(error.status === 401){
  //             this.errorMessage = 'Užívateľ s týmto emailom už existuje!';
  //             console.log("Bad credentials");
  //           }
  //         });
  //   } 
  // }
  

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
		this.modal.open(VerifyEmailModalComponent);
	}

  openAfterRegisterModal() {
    setTimeout(() => {
      this.modalService.openAfterRegisterModal();
    }, 3000);
  }
}
