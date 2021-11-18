import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, JsonpInterceptor } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {
    private baseUrl: string = 'http://localhost:44298/api/pharmacy';
    private baseUrlFeedback: string = 'http://localhost:44298/api/feedback/find/';

    constructor(private http: HttpClient) { }

    getPharmacies(): Observable<any> {
        localStorage.setItem('ApiKey', JSON.stringify("ABC"));    
        return this.http.get(this.baseUrl);
    }

    getResponsesByPharmacy(idPharmacy: string): Observable<any> {

        
        return this.http.get(this.baseUrlFeedback + idPharmacy);
    }
}