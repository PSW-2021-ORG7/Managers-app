import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shift } from '@app/hospital-map/models/schedule/shift.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShiftsService {
  private baseUrl: string = environment.baseUrlHospital + 'shifts'

  constructor(private http: HttpClient) { }
  
  getShifts(): Observable<Shift[]> {
    return this.http.get<Shift[]>(this.baseUrl);
  }
}
