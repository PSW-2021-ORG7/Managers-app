import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {
    private baseUrl: string = 'http://localhost:44298/api/pharmacy';

    constructor(private http: HttpClient) { }

    createNewPharmacy(obj: any): Observable<any> {
        return this.http.post(this.baseUrl, obj);
    }
}