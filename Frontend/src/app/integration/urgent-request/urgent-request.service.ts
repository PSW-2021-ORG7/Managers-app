import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrgentRequestService {
    private baseUrl: string = 'http://localhost:64677/inventory/check';

    constructor(private http: HttpClient) { }

    checkIfAvilable(obj: any): Observable<boolean> {
         localStorage.setItem('ApiKey', JSON.stringify("XYZ"));    
        return this.http.post<boolean>(this.baseUrl, obj);
    }
}