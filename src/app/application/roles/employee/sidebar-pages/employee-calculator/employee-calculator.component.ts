import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CalculatorResult } from 'src/app/application/model/calculatorResult';
import { workDay } from 'src/app/application/model/workDay';
import { WorkDayService } from 'src/app/application/service/work-day.service';

@Component({
  selector: 'app-employee-calculator',
  templateUrl: './employee-calculator.component.html',
  styleUrls: ['./employee-calculator.component.scss']
})
export class EmployeeCalculatorComponent {

  calculatorResult: CalculatorResult;

  calculatorGroup = new FormGroup({
    hours: new FormControl(0, Validators.required),
    salary: new FormControl(0, Validators.required),
  });

  constructor(
    private workDayService: WorkDayService,
    
  ) { }

  workMonth: workDay;

  ngOnInit(): void {
    this.sendCurrentDate();
    this.getCalculatorResult();
  }

  calculateSalary(): void {
    if(this.calculatorGroup.valid) {
      const hours = this.calculatorGroup.value.hours ?? 0;
      const salary = this.calculatorGroup.value.salary ?? 0;

      this.workDayService.calculateSalary(hours, salary).subscribe((response: CalculatorResult) => {
        this.calculatorResult = response;
        console.log('salary calculated');
      });
    }
  }

  public getCalculatorResult(): void{
    this.workDayService.getCalculatorResults().subscribe(
      (response: CalculatorResult) => {
        this.calculatorResult = response;
        console.log(this.calculatorResult, 'calculator result');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  sendCurrentDate(): void {
    const currentData = new Date();

    const dateString = formatDate(currentData, 'dd-MM-yyyy', 'en-US');
    console.log(dateString);

    this.workDayService.sendCurrentDate(dateString).subscribe((res: workDay) => {
      console.log('date sent');
      this.workMonth = res;
    });
  }
}
