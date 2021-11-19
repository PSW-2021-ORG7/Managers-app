import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrgentRequestService {
    private baseUrl: string = 'http://localhost:64677/inventory/check';

    constructor(private http: HttpClient) { }

    checkIfAvilable(obj: any): Observable<any> {
        return this.http.get(this.baseUrl, obj);
    }
}