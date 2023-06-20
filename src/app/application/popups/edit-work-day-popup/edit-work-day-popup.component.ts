import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { workDay } from '../../model/workDay';
import { WorkDayService } from '../../service/work-day.service';
import { RefreshService } from '../../service/refresh.service';

@Component({
  selector: 'app-edit-work-day-popup',
  templateUrl: './edit-work-day-popup.component.html',
  styleUrls: ['./edit-work-day-popup.component.scss']
})
export class EditWorkDayPopupComponent {

  @Input() workDay: workDay;
  model: NgbDateStruct;
  timeFrom = {hour: 13, minute: 30};
  timeTo = {hour: 18, minute: 30};
  lunchTime = {hour: 0, minute: 30};
  location: string = 'Terchova';

  constructor(
    public activeModal: NgbActiveModal,
    private workDayService: WorkDayService,
    private refreshService: RefreshService,
  ) { }

  ngOnInit(): void {
    if (this.workDay) {
      this.populateWorkDayData(this.workDay);
    }
  }

  editWorkDay() {

    const year = this.model.year;
    const month = this.model.month.toString().padStart(2, '0');
    const day = this.model.day.toString().padStart(2, '0');

    const date = `${day}-${month}-${year}`;

    const timeFromStr = `${this.timeFrom.hour.toString().padStart(2, '0')}:${this.timeFrom.minute.toString().padStart(2, '0')}`;
    const lunchTimeStr = `${this.lunchTime.hour.toString().padStart(2, '0')}:${this.lunchTime.minute.toString().padStart(2, '0')}`;
    const timeToStr = `${this.timeTo.hour.toString().padStart(2, '0')}:${this.timeTo.minute.toString().padStart(2, '0')}`;
    const place = this.location;

    this.workDayService.updateWorkDayInfo(date, timeFromStr, lunchTimeStr, timeToStr, place).subscribe(() => {
      this.activeModal.close();
      console.log('Work day info updated');
      this.refreshService.refresh();
    });
  }

  populateWorkDayData(workDay: workDay) {
    const [day, month, year] = workDay.date.split('-').map(Number);
    this.model = {day, month, year};

    this.timeFrom = this.parseTime(workDay.timeFrom);
    this.lunchTime = this.parseTime(workDay.pause);
    this.timeTo = this.parseTime(workDay.timeTo);

    this.location = workDay.place;
  }

  parseTime(time: string) {
    const [hour, minute] = time.split(':').map(Number);
    return {hour, minute};
  }
}