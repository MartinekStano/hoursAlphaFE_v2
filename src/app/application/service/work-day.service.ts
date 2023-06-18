import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json', 
  })
};

const BASE_URL = 'http://localhost:8081';

@Injectable({
  providedIn: 'root'
})
export class WorkDayService {

  constructor(
    private http: HttpClient,
  ) { }

  addWorkDayInfo(date: string, timeFrom: string, pause: string, timeTo: string, place: string): Observable<any>{
    return this.http.put(`${BASE_URL}/addWorkDayInfo`, {
      date,
      timeFrom,
      pause,
      timeTo,
      location,
    }, httpOptions);
  }


}
