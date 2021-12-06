import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PharmacyProfileService {
    private baseUrlHospital: string = 'http://localhost:44298/api/pharmacy';

    constructor(private http: HttpClient) { }

    getPharmacies(): Observable<any> {
      
        localStorage.setItem('ApiKey', JSON.stringify("ABC"));
        return this.http.get(this.baseUrlHospital);
      }

}