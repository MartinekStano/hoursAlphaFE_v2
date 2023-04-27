import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../service/validation.service';

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
    
  ) { }

  login(){
    console.log(this.loginGroup.value);
  }

  isEmailValidFormat(): boolean {
    const email = this.loginGroup.value.email;
    if(email === null || email === undefined){
      return false
    } else {
      return this.validationService.isEmailValid(email);
    }
  }
}
