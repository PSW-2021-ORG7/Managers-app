import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {
    private baseUrl: string = environment.baseUrlIntegration + 'api/pharmacy';

    constructor(private http: HttpClient) { }

    createNewPharmacy(obj: any): Observable<any> {
        localStorage.setItem('ApiKey', JSON.stringify("ABC"));    
        return this.http.post(this.baseUrl, obj);
    }
}