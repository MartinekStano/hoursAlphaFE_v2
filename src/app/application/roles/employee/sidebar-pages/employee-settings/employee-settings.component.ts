import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-settings',
  templateUrl: './employee-settings.component.html',
  styleUrls: ['./employee-settings.component.scss']
})
export class EmployeeSettingsComponent {

  hide: boolean = true;
  hide2: boolean = true;

  constructor() { }

  ngOnInit(): void {}
}
