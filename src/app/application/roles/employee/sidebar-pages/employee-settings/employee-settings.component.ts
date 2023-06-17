import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileData } from 'src/app/application/model/profileData';
import { ModalService } from 'src/app/application/service/modal.service';
import { ProfileService } from 'src/app/application/service/profile.service';

@Component({
  selector: 'app-employee-settings',
  templateUrl: './employee-settings.component.html',
  styleUrls: ['./employee-settings.component.scss']
})
export class EmployeeSettingsComponent {

  hide: boolean = true;
  hide2: boolean = true;

  profileData: ProfileData;

  profileDataGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    zip: new FormControl('', Validators.required),
  });

  changePasswordGroup = new FormGroup({
    newPassword: new FormControl('', Validators.required),
  });

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }

  sendUserData(): void {
    if(this.profileDataGroup.valid){
      console.log(this.profileDataGroup.value);

      const firstName = this.profileDataGroup.value.firstName ?? '';
      const lastName = this.profileDataGroup.value.lastName ?? '';
      const email = this.profileDataGroup.value.email ?? '';
      const phoneNumber = this.profileDataGroup.value.phoneNumber ?? '';
      const address = this.profileDataGroup.value.address ?? '';
      const zip = this.profileDataGroup.value.zip ?? '';

      this.profileService.addProfileData(firstName, lastName, email, phoneNumber, address, zip).subscribe(
        () => {
          this.router.navigate(['/employee-profile']);
        }
      );
    }
  }

  getUserData(): void {
    this.profileService.getProfileData().subscribe(
      (response) => {
        this.profileData = response;
        this.profileDataGroup.patchValue({
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          phoneNumber: response.phoneNumber,
          address: response.address,
          zip: response.zip,
        });
      }
    );
  }

  openDeleteAccountModal(): void {
    this.modalService.openDeleteAccountModal();
  }
}
