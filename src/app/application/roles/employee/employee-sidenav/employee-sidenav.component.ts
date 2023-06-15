import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { navbarData } from '../nav-data';
import { animate, style, transition, trigger } from '@angular/animations';
import { AuthService } from 'src/app/application/service/auth.service';
import { Router } from '@angular/router';

interface sideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-employee-sidenav',
  templateUrl: './employee-sidenav.component.html',
  styleUrls: ['./employee-sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
          style({ opacity: 0 }),
        animate('350ms', 
          style({ opacity: 1 })
        )
      ]),
      transition(':leave', [
          style({ opacity: 1 }),
        animate('350ms',
          style({ opacity: 0 })
        )
      ]),
    ])
  ],
})
export class EmployeeSidenavComponent {

  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  showCloseButton = false;

  @Output() onToggleSideNav: EventEmitter<sideNavToggle> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router,
    
  ) { }

  ngOnInit(): void {
    
  }

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

  clickOnLogOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log("Logout");
  }
}
