import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { workDay } from 'src/app/application/model/workDay';
import { EditWorkDayPopupComponent } from 'src/app/application/popups/edit-work-day-popup/edit-work-day-popup.component';
import { ModalService } from 'src/app/application/service/modal.service';
import { RefreshService } from 'src/app/application/service/refresh.service';
import { WorkDayService } from 'src/app/application/service/work-day.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent {

  allWorkDays: workDay[];
  private refreshSubscription: Subscription;

  constructor(
    private modalService: ModalService,
    private workDayService: WorkDayService,
    private refreshService: RefreshService,
    private modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.refreshSubscription = this.refreshService.onRefresh.subscribe(() => {
      this.getAllWorkingDays();
    });
    
    this.getAllWorkingDays();
  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  openAddHoursModal() {
    this.modalService.openAddHoursModal();
  }

  openEditWorkDayModal(workDayToEdit: any) {
    const modalRef = this.modal.open(EditWorkDayPopupComponent, { size: 'xl' });
    modalRef.componentInstance.workDay = workDayToEdit; // Here is where you pass the data to the modal
  }

  public getAllWorkingDays(): void{
    this.workDayService.getAllWorkingDays().subscribe(
      (response: workDay[]) => {
        this.allWorkDays = response;
        console.log(this.allWorkDays);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
