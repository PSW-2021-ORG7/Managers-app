import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EquipmentTransfer } from '../../models/equipment/equipment-transfer.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentTransferService {
  private baseUrl: string = 'https://localhost:44342/api/transfers';

  constructor(private http: HttpClient) { }

  postEquipmentTransfer(equipmentTransfer: EquipmentTransfer): void {
    this.http.post<EquipmentTransfer>(this.baseUrl, equipmentTransfer);
  }
}
