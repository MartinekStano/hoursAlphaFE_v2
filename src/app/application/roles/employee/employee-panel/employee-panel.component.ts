import { Component, EventEmitter, Output } from '@angular/core';
import { navbarData } from '../nav-data';

interface sideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-employee-panel',
  templateUrl: './employee-panel.component.html',
  styleUrls: ['./employee-panel.component.scss']
})

export class EmployeePanelComponent {

  @Output() onToggleSideNav: EventEmitter<sideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  constructor() { }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
}
