import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Chart} from 'angular-highcharts'
import * as Highcharts from 'highcharts';
import { workDay } from 'src/app/application/model/workDay';
import { WorkDayService } from 'src/app/application/service/work-day.service';

@Component({
  selector: 'app-employee-stats',
  templateUrl: './employee-stats.component.html',
  styleUrls: ['./employee-stats.component.scss']
})
export class EmployeeStatsComponent {

  lineChart: Chart;

  // lineChart = new Chart({
  //   chart: {
  //     type: 'line'
  //   },
  //   title: {
  //     text: 'Linechart'
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   series: [
  //     {
  //       name: 'Line 1',
  //       data: [1, 2, 3]
  //     } as any
  //   ],
  // });

  areaChart = new Chart({
    title: {
      text: 'Area chart'
    },
    series: [
      {
        type: 'area',
        data: [1, 2, 3, 4, 5]
      }
    ]
  });

  barChart = new Chart({
    title: {
      text: 'Bar chart'
    },
    series: [
      {
        type: 'bar',
        data: [1, 2, 3, 4, 5]
      }
    ]
  });

  columnChart = new Chart({
    title: {
      text: 'Column chart'
    },
    series: [
      {
        type: 'column',
        data: [1, 2, 3, 4, 5]
      }
    ]
  });

  // pieChart = new Chart({
  //   chart: {
  //     type: 'pie',
  //     plotShadow: false,
  //   },
  //   credits: {
  //     enabled: false,
  //   },
  //   plotOptions: {
  //     pie: {
  //       innerSize: '99%',
  //       borderWidth: 10,
  //       borderColor: '',
  //       slicedOffset: 10,
  //       dataLabels: {
  //         connectorWidth: 0,
  //       },
  //     },
  //   },

  //   title: {
  //     verticalAlign: 'middle',
  //     floating: true,
  //     text: 'Piechart',
  //   },
  //   legend: {
  //     enabled: false,
  //   },

  //   series: [{
  //     type: 'pie',
  //     data: [
  //       {name: 'Firefox', y: 1, color: '#FF0000'},
  //       {name: 'HIV/AIDS', y: 2, color: '#393E46'},
  //       {name: 'EBOLA', y: 3, color: '#00ADB5'},
  //       {name: 'SARS', y: 4, color: '#222831'},
  //       {name: 'MERS', y: 5, color: '#EEEEEE'},
  //       {name: 'Others', y: 6, color: '#393E46'},
  //     ]
  //   }]
  // });

  pieChart: Chart;

  allWorkDays: workDay[];

  constructor(
    private workDayService: WorkDayService,
  ) { }

  ngOnInit(): void {
    this.getAllWorkingDays();
  }


  // public getAllWorkingDays(): void {
  //   this.workDayService.getAllWorkingDays().subscribe(
  //     (response: workDay[]) => {
  //       const dates = response.map(workday => workday.date);
  //       const totalHours = response.map(workday => workday.totalHours);

  //       this.lineChart = new Chart({
  //         chart: {
  //           type: 'line'
  //         },
  //         title: {
  //           text: 'Linechart'
  //         },
  //         credits: {
  //           enabled: false
  //         },
  //         xAxis: {
  //           categories: dates,
  //         },
  //         series: [
  //           {
  //             name: 'Total Hours',
  //             data: totalHours
  //           } as any
  //         ],
  //       });  
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  public getAllWorkingDays(): void {
    this.workDayService.getAllWorkingDays().subscribe(
      (response: workDay[]) => {
        const dates = response.map(workday => workday.date);
        const totalHours = response.map(workday => workday.totalHours);
        const pieData = response.map(workday => {
          return {
            name: workday.date,
            y: workday.totalSalary
          };
        });

        this.lineChart = new Chart({
          chart: {
            type: 'line'
          },
          title: {
            text: 'Linechart'
          },
          credits: {
            enabled: false
          },
          xAxis: {
            categories: dates,
          },
          series: [
            {
              name: 'Total Hours',
              data: totalHours
            } as any
          ],
        });  

        this.pieChart = new Chart({
          chart: {
            type: 'pie'
          },
          title: {
            text: 'Piechart'
          },
          credits: {
            enabled: false
          },
          series: [{
            name: 'Total Salary',
            data: pieData,
            type: 'pie'
          }]
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
