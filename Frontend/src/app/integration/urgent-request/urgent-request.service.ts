import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrgentRequestService {

  constructor(private http: HttpClient) { }

  updatePharmacyInventory(obj: any, idMedicine: number, apiKey: string, endpoint: string): Observable<any>{

    localStorage.setItem('ApiKey', JSON.stringify(apiKey));  
    return this.http.put(endpoint + "inventory/" + idMedicine, obj);
}

  UpdateHospitalInventory(obj: any, quantity: number, apiKey: string, endpoint: string): Observable<any>{

  localStorage.setItem('ApiKey', JSON.stringify("ABC"));  
  return this.http.put("http://localhost:44298" + "/inventory/order/" + quantity, obj);
}

}