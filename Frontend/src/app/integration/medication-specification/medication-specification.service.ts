import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicationSpecificationService {
    private baseUrl: string = 'http://localhost:64677/inventory/check'
    private baseUrlHospital: string = 'http://localhost:44298/api/pharmacy';
    private baseUrlFindMedicine: string = "http://localhost:64677/"

    constructor(private http: HttpClient) { }

    checkIfAvailable(obj: any): Observable<boolean> {
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

    requestSpecification(name: string, dose: string, apiKey: string, endpoint: string): Observable<any>{

        localStorage.setItem('ApiKey', JSON.stringify(apiKey));  
        return this.http.get(endpoint + "medicine/request/" + name + "/" + dose);
    }
}