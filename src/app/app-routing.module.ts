import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './application/main/landing/landing.component';
import { LoginComponent } from './application/security/login/login.component';
import { RegisterComponent } from './application/security/register/register.component';
import { ForgotPasswordResetPasswordComponent } from './application/security/securityAccountManagement/passwordManagement/forgot-password-reset-password/forgot-password-reset-password.component';
import { ForgotPasswordSendEmailComponent } from './application/security/securityAccountManagement/passwordManagement/forgot-password-send-email/forgot-password-send-email.component';
import { AboutComponent } from './application/main/about/about.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },  
  { path: 'about', component: AboutComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotPasswordReset', component: ForgotPasswordResetPasswordComponent },
  { path: 'forgotPasswordEmail', component: ForgotPasswordSendEmailComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const basicRoutingComponents = [
  LandingComponent,
  AboutComponent,
  LoginComponent,
  RegisterComponent,
  ForgotPasswordResetPasswordComponent,
  ForgotPasswordSendEmailComponent,

];