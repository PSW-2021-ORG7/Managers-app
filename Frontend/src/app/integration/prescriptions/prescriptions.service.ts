import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private baseUrlHospital: string = 'http://localhost:44298/api/prescription';
  private baseUrlHospitalMedicine: string = 'http://localhost:44298/api/medicine';

  constructor(private http: HttpClient) { }

  getPharmacies(): Observable<any> {

    localStorage.setItem('ApiKey', JSON.stringify("ABC"));
    return this.http.get(this.baseUrlHospital);
  }

  getPrescriptionyByID(id: string): Observable<any> {
      
    localStorage.setItem('ApiKey', JSON.stringify("ABC"));
    return this.http.get(this.baseUrlHospital + "/" + id);
}

  getPrescriptions(): Observable<any> {

    localStorage.setItem('ApiKey', JSON.stringify("ABC"));
    return this.http.get(this.baseUrlHospital);
  }

  getMedicineById(id: number): Observable<any> {
    
    localStorage.setItem('ApiKey', JSON.stringify("ABC"));
    return this.http.get(this.baseUrlHospitalMedicine + "/" + id )
  }

  sendPrescriptionSFTP(obj: any, apiKey: string): Observable<any>{

    localStorage.setItem('ApiKey', JSON.stringify(apiKey));  
    return this.http.post(this.baseUrlHospital + "/SFTP", obj);
}

  downloadPrescriptionSFTP(fileName: string, apiKey: string, endpoint: string): Observable<any>{
    
    //To be adjusted for multiple pharmacies
    localStorage.setItem('ApiKey', JSON.stringify(apiKey));
    return this.http.get(endpoint + "medicine/downloadPrescription/" + fileName);
  }

}