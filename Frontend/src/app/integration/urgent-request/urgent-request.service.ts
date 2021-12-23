import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  return this.http.put(environment.baseUrlHospital + "medicine/inventory/order/" + quantity, obj);
}

}