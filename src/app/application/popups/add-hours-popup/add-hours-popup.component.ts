import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { WorkDayService } from '../../service/work-day.service';

@Component({
  selector: 'app-add-hours-popup',
  templateUrl: './add-hours-popup.component.html',
  styleUrls: ['./add-hours-popup.component.scss']
})
export class AddHoursPopupComponent {

  model: NgbDateStruct;
  date: {year: number, month: number};
  timeFrom = {hour: 13, minute: 30};
  timeTo = {hour: 18, minute: 30};
  lunchTime = {hour: 0, minute: 30};
  location: string = 'Terchova';

  constructor(
    public activeModal: NgbActiveModal,
    private calendar: NgbCalendar,
    private workDayService: WorkDayService,
  ) { }

  ngOnInit(): void {}

  selectToday() {
    this.model = this.calendar.getToday();
  }

  sendWorkDayInfo() {
    console.log(this.date.year, this.date.month, this.model.day, this.timeFrom, this.timeTo, this.lunchTime, this.location);
  
    const year = this.date.year;
    const month = this.model.month.toString().padStart(2, '0');  // Add leading zero if necessary
    const day = this.model.day.toString().padStart(2, '0');  // Add leading zero if necessary
  
    const date = `${year}-${month}-${day}`;
  
    const timeFromStr = `${this.timeFrom.hour.toString().padStart(2, '0')}:${this.timeFrom.minute.toString().padStart(2, '0')}`;  // Add leading zeros if necessary
    const lunchTimeStr = `${this.lunchTime.hour.toString().padStart(2, '0')}:${this.lunchTime.minute.toString().padStart(2, '0')}`;  // Add leading zeros if necessary
    const timeToStr = `${this.timeTo.hour.toString().padStart(2, '0')}:${this.timeTo.minute.toString().padStart(2, '0')}`;  // Add leading zeros if necessary
    const location = this.location;
  
    console.log('after parse: ', date, timeFromStr, lunchTimeStr, timeToStr, location);
  
    return this.workDayService.addWorkDayInfo(date, timeFromStr, lunchTimeStr, timeToStr, location).subscribe(() => {
      this.activeModal.close();
      console.log('Work day info added');
    });
  }
}
