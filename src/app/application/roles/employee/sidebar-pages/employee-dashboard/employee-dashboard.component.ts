import { Component } from '@angular/core';
import { ModalService } from 'src/app/application/service/modal.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent {

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit(): void {}

  openAddHoursModal() {
    this.modalService.openAddHoursModal();
  }
}
