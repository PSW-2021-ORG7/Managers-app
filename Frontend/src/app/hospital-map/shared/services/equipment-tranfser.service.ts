import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EquipmentTransfer } from '../../models/equipment/equipment-transfer.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentTransferService {
  private baseUrl: string = environment.baseUrlHospital;

  constructor(private http: HttpClient) { }

  getAvailableTimeSlots(equipmentTransfer : EquipmentTransfer, transferStartDate: string, transferEndDate: string): Observable<Date[]> {
    let params = new HttpParams()
    .set('start', transferStartDate)
    .set('end', transferEndDate)
    .set('duration', equipmentTransfer.transferDuration)
    .set('srcRoomId', equipmentTransfer.sourceRoomId)
    .set('dstRoomId', equipmentTransfer.destinationRoomId);
    return this.http.get<Date[]>(this.baseUrl + "availableTimeSlots", {params});
  }
  
  postEquipmentTransfer(equipmentTransfer: EquipmentTransfer): Observable<EquipmentTransfer> {
    return this.http.post<EquipmentTransfer>(this.baseUrl + 'transfers', equipmentTransfer);
  }

  getTransfersForRoom(roomId: number) : Observable<EquipmentTransfer[]>{
    return this.http.get<EquipmentTransfer[]>(this.baseUrl + 'transfers/room/' + roomId);
  }

  deleteEquipmentTransfer(equipmentTransfer: EquipmentTransfer): Observable<EquipmentTransfer>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: 
      equipmentTransfer    
    } 
    return this.http.delete<EquipmentTransfer>(this.baseUrl + 'transfers', options);
  }
}
