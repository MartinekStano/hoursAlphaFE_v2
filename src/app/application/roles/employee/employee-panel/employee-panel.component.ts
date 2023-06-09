import { Component, EventEmitter, HostListener, Output } from '@angular/core';
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

  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  showCloseButton = false;

  constructor() { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const sidenav = document.querySelector('.sidenav');
    if (!sidenav?.contains(event.target as Node)) {
      this.closeSidenav();
    }
  }

  toggleCollapse(): void {
    if (!this.collapsed) {
      this.collapsed = true;
    } else if(this.collapsed) {
      this.collapsed = false;
    }
  }
  

  closeSidenav(): void {
    this.collapsed = false;
  }
}
