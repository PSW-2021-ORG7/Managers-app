import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrgentRequestService {
  private baseUrl: string = 'http://localhost:64677/inventory/check';
  private baseUrlHospital: string = 'http://localhost:44298/api/pharmacy';

  constructor(private http: HttpClient) { }

  checkIfAvilable(obj: any): Observable<boolean> {
    localStorage.setItem('ApiKey', JSON.stringify("XYZX"));
    return this.http.post<boolean>(this.baseUrl, obj);
  }

  getPharmacyByID(id: string): Observable<any> {

    localStorage.setItem('ApiKey', JSON.stringify("ABC"));
    return this.http.get(this.baseUrlHospital + "/" + id);
  }

  findMedicineByNameAndDose(name: string, dose: string, apiKey: string, endpoint: string): Observable<any> {

    localStorage.setItem('ApiKey', JSON.stringify(apiKey));    
    return this.http.get(endpoint + "medicine/find/" + name + "/" + dose);
}

  updatePharmacyInventory(obj: any, idMedicine: number, apiKey: string, endpoint: string): Observable<any>{

    localStorage.setItem('ApiKey', JSON.stringify(apiKey));  
    return this.http.put(endpoint + "inventory/" + idMedicine, obj);
}

}