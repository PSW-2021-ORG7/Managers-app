import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EquipmentTransfer } from '../../models/equipment/equipment-transfer.model';

@Injectable({
  providedIn: 'root'
})
export class AvailableTimeSlotsService {
  private baseUrl: string = environment.baseUrlHospital;

  constructor(private http: HttpClient) { }

  getAvailableTimeSlots(start: string, end: string, duration: string, firstRoomId: number, secondRoomId?: number): Observable<Date[]> {
    let params = new HttpParams()
        .set('start', start)
        .set('end', end)
        .set('duration', duration)
        .set('firstRoomId', firstRoomId);
    if(secondRoomId){
        params = new HttpParams()
        .set('start', start)
        .set('end', end)
        .set('duration', duration)
        .set('firstRoomId', firstRoomId)
        .set('secondRoomId', secondRoomId);
    }
        
    return this.http.get<Date[]>(this.baseUrl + "availableTimeSlots", {params});
  }
}

  