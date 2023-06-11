import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-employee-body',
  templateUrl: './employee-body.component.html',
  styleUrls: ['./employee-body.component.scss']
})
export class EmployeeBodyComponent {

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  constructor() { }

  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth < 768) {
      styleClass = 'body-trimmed';
    } 
    else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen';
    }
    return styleClass;  
  }
}
