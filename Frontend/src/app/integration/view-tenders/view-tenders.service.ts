import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenderViewService {

    constructor(private http: HttpClient) { }

    getAllOffersByTenderId(tenderId: string, apiKey: string): Observable<any> {
        localStorage.setItem('ApiKey', JSON.stringify(apiKey));    
        return this.http.get(environment.baseUrlIntegration + "api/tendering/getOffers/" + tenderId);
    }

    getAllActiveTenders(apiKey: string): Observable<any> {
        localStorage.setItem('ApiKey', JSON.stringify(apiKey));    
        return this.http.get(environment.baseUrlIntegration + "api/tendering/getActive");
    }

}