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

    getTenderById(id: string, apiKey: string): any{
        localStorage.setItem('ApiKey', JSON.stringify(apiKey));    
        return this.http.get(environment.baseUrlIntegration + "api/tendering/" + id);
    }

    setWinner(idTender: number, idWinner: number, apiKey: string): Observable<boolean>{
        localStorage.setItem('ApiKey', JSON.stringify(apiKey));    
        return this.http.put<boolean>(environment.baseUrlIntegration + "api/tendering/setWinner/" + idTender + "/" + idWinner, null);
    }

    sendMessage(message: string, endpoint: string, apiKey: string): Observable<string>{
        localStorage.setItem('ApiKey', JSON.stringify(apiKey));    
        return this.http.post<string>(endpoint + "tendering/message", JSON.stringify(message));
    }

    closeTender(idTender: number): Observable<boolean>{
        localStorage.setItem('ApiKey', JSON.stringify("ABC"));  
        return this.http.put<boolean>(environment.baseUrlIntegration + "api/tendering/closeTender/" + idTender, null)
    }

}