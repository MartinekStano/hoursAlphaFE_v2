import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './application/main/landing/landing.component';
import { LoginComponent } from './application/security/login/login.component';
import { RegisterComponent } from './application/security/register/register.component';
import { ForgotPasswordResetPasswordComponent } from './application/security/securityAccountManagement/passwordManagement/forgot-password-reset-password/forgot-password-reset-password.component';
import { ForgotPasswordSendEmailComponent } from './application/security/securityAccountManagement/passwordManagement/forgot-password-send-email/forgot-password-send-email.component';
import { AboutComponent } from './application/main/about/about.component';
import { EmployeePanelComponent } from './application/roles/employee/employee-panel/employee-panel.component';
import { EmployeeDashboardComponent } from './application/roles/employee/sidebar-pages/employee-dashboard/employee-dashboard.component';
import { EmployeeStatsComponent } from './application/roles/employee/sidebar-pages/employee-stats/employee-stats.component';
import { EmployeeDocumentsComponent } from './application/roles/employee/sidebar-pages/employee-documents/employee-documents.component';
import { EmployeeCalculatorComponent } from './application/roles/employee/sidebar-pages/employee-calculator/employee-calculator.component';
import { EmployeeSettingsComponent } from './application/roles/employee/sidebar-pages/employee-settings/employee-settings.component';
import { EmployeeProfileComponent } from './application/roles/employee/sidebar-pages/employee-profile/employee-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },  
  { path: 'about', component: AboutComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotPasswordReset', component: ForgotPasswordResetPasswordComponent },
  { path: 'forgotPasswordEmail', component: ForgotPasswordSendEmailComponent },

  { path: 'employer-panel', component: EmployeePanelComponent },
  
  { path: 'employee-panel', component: EmployeePanelComponent, children: [
    { path: '', redirectTo: 'employee-dashboard', pathMatch: 'full' },
    { path: 'employee-dashboard', component: EmployeeDashboardComponent},
    { path: 'employee-stats', component: EmployeeStatsComponent },
    { path: 'employee-documents', component: EmployeeDocumentsComponent },
    { path: 'employee-calculator', component: EmployeeCalculatorComponent },
    { path: 'employee-settings', component: EmployeeSettingsComponent },
    { path: 'employee-profile', component: EmployeeProfileComponent },
  ]},



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
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