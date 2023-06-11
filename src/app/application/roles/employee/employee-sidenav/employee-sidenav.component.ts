import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { navbarData } from '../nav-data';

interface sideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-employee-sidenav',
  templateUrl: './employee-sidenav.component.html',
  styleUrls: ['./employee-sidenav.component.scss']
})
export class EmployeeSidenavComponent {

  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  showCloseButton = false;

  @Output() onToggleSideNav: EventEmitter<sideNavToggle> = new EventEmitter();

  constructor() { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const sidenav = document.querySelector('.sidenav');
    if (!sidenav?.contains(event.target as Node)) {
      this.closeSidenav();
    }
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed; // Toggle the collapsed state
    this.onToggleSideNav.emit({ screenWidth: this.screenWidth, collapsed: this.collapsed });
  }
  
  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ screenWidth: this.screenWidth, collapsed: this.collapsed });
  }
}
