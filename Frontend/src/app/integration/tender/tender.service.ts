import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenderService {

    constructor(private http: HttpClient) { }

    sendTenderRequest(obj: any, apiKey: string, endpoint: string): Observable<boolean> {
        localStorage.setItem('ApiKey', JSON.stringify(apiKey));    
        return this.http.post<boolean>(endpoint + "tendering/request_a_tender_offer", obj);
    }
}