import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../service/validation.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { VerifyEmailModalComponent } from '../../popups/verify-email-modal/verify-email-modal.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  hide: boolean = true;
  hide2: boolean = true;

  errorMessage: string = '';

  selectedRole: string = '';
  roleButtonValue: string = 'Choose role: ';

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
  ) { 
  }

  ngOnInit(): void {

  }

  register(){
    console.log(this.registerGroup.value);
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

  setRoleValue(roleId: number){
    if(roleId === 1){
      this.selectedRole = 'as Employer';
      this.roleButtonValue = 'Role Chosen: Employer';
      this.registerGroup.value.role = 'employer';
      return 1;
    } else{
      this.selectedRole = 'as Employee';
      this.roleButtonValue = 'Role Chosen: Employee';
      this.registerGroup.value.role = 'employee';
      return 2;
    }
  }

  openModal() {
		this.modalService.open(VerifyEmailModalComponent);
	}
}
