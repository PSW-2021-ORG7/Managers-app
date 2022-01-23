import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private baseUrl: string = environment.baseUrlIntegration;
  private baseUrlHospital: string = environment.baseUrlHospital

  constructor(private http: HttpClient) { }

  getPharmacies(): Observable<any> {

    localStorage.setItem('ApiKey', JSON.stringify("ABC"));
    return this.http.get(this.baseUrl + "api/pharmacy");
  }

  getPrescriptionyByID(id: string): Observable<any> {
      
    localStorage.setItem('ApiKey', JSON.stringify("ABC"));
    return this.http.get(this.baseUrl + "api/prescription/" + id);
}

  getPrescriptions(): Observable<any> {

    localStorage.setItem('ApiKey', JSON.stringify("ABC"));
    return this.http.get(this.baseUrl + "api/prescription");
  }

  getMedicineById(id: number): Observable<any> {
    
    localStorage.setItem('ApiKey', JSON.stringify("ABC"));
    return this.http.get(this.baseUrlHospital + "medicine/" + id )
  }

  sendPrescriptionSFTP(obj: any, apiKey: string): Observable<any>{

    localStorage.setItem('ApiKey', JSON.stringify(apiKey));  
    return this.http.post(this.baseUrl + "api/prescription/SFTP", obj);
}

  downloadPrescriptionSFTP(fileName: string, apiKey: string, endpoint: string): Observable<any>{
    
    //To be adjusted for multiple pharmacies
    localStorage.setItem('ApiKey', JSON.stringify(apiKey));
    return this.http.get(endpoint + "medicine/downloadPrescription/" + fileName);
  }

}