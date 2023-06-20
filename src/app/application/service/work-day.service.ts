import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { workDay } from '../model/workDay';

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

  getAllWorkingDays(): Observable<workDay[]>{
    return this.http.get<workDay[]>(`${BASE_URL}/Auth/getAllDayRecords`);
  }
}
