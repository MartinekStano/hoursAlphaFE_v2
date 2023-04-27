import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../service/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  hide: boolean = true;
  hide2: boolean = true;

  errorMessage: string = '';

  registerGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordCheck: new FormControl('', Validators.required),
    termsAccepted: new FormControl('', Validators.required),
  });

  constructor(
    private validationService: ValidationService,

  ) { }

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
}
