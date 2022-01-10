import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicationSpecificationService {

    private baseUrl: string = environment.baseUrlPharmacy + 'inventory/check/'
    private baseUrlHospital: string = environment.baseUrlIntegration + 'api/pharmacy';


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

    requestSpecification(name: string, dose: string, apiKey: string, endpoint: string): Observable<string>{

        localStorage.setItem('ApiKey', JSON.stringify(apiKey));  
        return this.http.get<string>(endpoint + "medicine/request/" + name + "/" + dose);
    }

    downloadSpecification(fileName: string): Observable<any>{
        
        //To be adjusted for multiple pharmacies
        localStorage.setItem('ApiKey', JSON.stringify("ABC"));
        return this.http.get(this.baseUrlHospital + "/downloadSpec/" + fileName);
    }
}