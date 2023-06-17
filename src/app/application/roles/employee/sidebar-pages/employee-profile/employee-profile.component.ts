import { Component } from '@angular/core';
import { ProfileData } from 'src/app/application/model/profileData';
import { ProfileService } from 'src/app/application/service/profile.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent {

  hide: boolean = true;

  profileData: ProfileData;

  constructor(
    private profileService: ProfileService,

  ) { }

  ngOnInit(): void {}

  getUserData(): void {
    this.profileService.getProfileData().subscribe(
      (data) => {
        this.profileData = data;
        console.log(this.profileData);
      }
    );
  }
}
