import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class FeedbackService {
      private baseUrl: string = 'http://localhost:44298/api/pharmacies';
  
      constructor(private http: HttpClient) { }
  
      getPharmacies(): Observable<any> {
        
          return this.http.get(this.baseUrl);
      }
  }