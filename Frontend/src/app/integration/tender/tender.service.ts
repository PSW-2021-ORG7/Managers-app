import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenderService {

    constructor(private http: HttpClient) { }

    openTender(obj: any, apiKey: string): any {
        localStorage.setItem('ApiKey', JSON.stringify(apiKey));    
        return this.http.post(environment.baseUrlIntegration + "api/tendering/addTender", obj);
    }

    sendTenderRequest(obj: any, apiKey: string): Observable<boolean> {
        localStorage.setItem('ApiKey', JSON.stringify(apiKey));    
        return this.http.post<boolean>(environment.baseUrlIntegration + "api/tendering/sendRequest", obj);
    }
}