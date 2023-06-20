import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { workDay } from '../model/workDay';
import { CalculatorResult } from '../model/calculatorResult';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json', 
  })
};

const BASE_URL = 'http://localhost:8082';

@Injectable({
  providedIn: 'root'
})
export class WorkDayService {

  constructor(
    private http: HttpClient,
  ) { }

  addWorkDayInfo(date: string, timeFrom: string, pause: string, timeTo: string, place: string): Observable<any>{
    return this.http.post(`${BASE_URL}/Auth/createDayRecord`, {
      date,
      timeFrom,
      pause,
      timeTo,
      place,
    }, httpOptions);
  }

  updateWorkDayInfo(date: string, timeFrom: string, pause: string, timeTo: string, place: string): Observable<any> {
    return this.http.put(`${BASE_URL}/Auth/editDayRecords`, {
      date,
      timeFrom,
      pause,
      timeTo,
      place,
    }, httpOptions);
  }

  calculateSalary(totalHours: number, salaryPerHour: number): Observable<any>{
    return this.http.post(`${BASE_URL}/Auth/salaryCalculatorWithParam`, {
      totalHours,
      salaryPerHour,
    }, httpOptions);
  }

  sendCurrentDate(date: string): Observable<any>{
    return this.http.post(`${BASE_URL}/Auth/calculatorSalary/${date}`, httpOptions);
  }

  getAllWorkingDays(): Observable<workDay[]>{
    return this.http.get<workDay[]>(`${BASE_URL}/Auth/getAllDayRecords`);
  }

  getCalculatorResults(): Observable<any>{
    return this.http.get<CalculatorResult>(`${BASE_URL}/Auth/salaryCalculatorInit`);
  }
}
