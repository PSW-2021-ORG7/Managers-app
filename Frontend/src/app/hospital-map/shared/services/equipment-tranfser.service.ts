import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EquipmentTransfer } from '../../models/equipment/equipment-transfer.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentTransferService {
  private baseUrl: string = 'https://localhost:44342/api';

  constructor(private http: HttpClient) { }


  getAvailableTimeSlots(equipmentTransfer : EquipmentTransfer): Observable<Date[]> {
    let params = new HttpParams()
    .set('start', equipmentTransfer.transferStartDate)
    .set('end', equipmentTransfer.transferEndDate)
    .set('duration', equipmentTransfer.transferDuration)
    .set('srcRoomId', equipmentTransfer.sourceRoomId)
    .set('dstRoomId', equipmentTransfer.destinationRoomId);
    return this.http.get<Date[]>(this.baseUrl + "/availableTimeSlots", {params});
  }
  
}
