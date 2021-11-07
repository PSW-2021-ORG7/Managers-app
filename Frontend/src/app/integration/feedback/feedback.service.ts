import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {
    private baseUrl: string = 'http://localhost:44298/api/pharmacies';
    private baseUrlFeedback: string = 'http://localhost:44298/api/feedback/find/';

    constructor(private http: HttpClient) { }

    getPharmacies(): Observable<any> {

        return this.http.get(this.baseUrl);
    }

    getResponsesByPharmacy(idPharmacy: string): Observable<any> {

        return this.http.get(this.baseUrlFeedback + idPharmacy);
    }
}