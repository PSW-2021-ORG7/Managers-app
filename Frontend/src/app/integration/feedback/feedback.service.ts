import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, JsonpInterceptor } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {
    private baseUrl: string = environment.baseUrlIntegration + 'api/pharmacy';
    private baseUrlFeedback: string = environment.baseUrlIntegration + 'api/feedback/find/';

    constructor(private http: HttpClient) { }

    getPharmacies(): Observable<any> {
        localStorage.setItem('ApiKey', JSON.stringify("ABC"));    
        return this.http.get(this.baseUrl);
    }

    getResponsesByPharmacy(idPharmacy: string): Observable<any> {

        
        return this.http.get(this.baseUrlFeedback + idPharmacy);
    }
}