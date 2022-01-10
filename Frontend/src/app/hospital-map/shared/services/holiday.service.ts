import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Holiday } from '@app/hospital-map/models/shift/holiday.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  private baseUrl: string = environment.baseUrlHospital + 'holidays';

  constructor(private http: HttpClient) { }

  getHolidays(doctorId: number): Observable<Holiday[]> {
    let params = new HttpParams().set('doctorId', doctorId)
    return this.http.get<Holiday[]>(this.baseUrl, { params: params });
  }

  postHoliday(holiday: Holiday): Observable<any> {
    return this.http.post<any>(this.baseUrl, holiday);
  }

  updateHoliday(holiday: Holiday): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/' + holiday.id, holiday);
  }
}
