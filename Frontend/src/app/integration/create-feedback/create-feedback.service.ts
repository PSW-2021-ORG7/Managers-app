import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateFeedbackService {
    private baseUrl: string = 'http://localhost:44298/api/pharmacies';
    constructor(private http: HttpClient) { }

    getPharmacies(): Observable<any> {
      
        return this.http.get(this.baseUrl);
    }

    getPharmacyByID(id: string): Observable<any> {
      
      return this.http.get(this.baseUrl + "/" + id);
  }
}