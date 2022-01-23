import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateFeedbackService {
  
  private baseUrlHospital: string = environment.baseUrlIntegration + 'api/pharmacy';
  
    constructor(private http: HttpClient) { }

  getPharmacies(): Observable<any> {

    localStorage.setItem('ApiKey', JSON.stringify("ABC"));
    return this.http.get(this.baseUrlHospital);
  }

  getPharmacyByID(id: string): Observable<any> {
      
    localStorage.setItem('ApiKey', JSON.stringify("ABC"));
    return this.http.get(this.baseUrlHospital + id);
}

  addFeedback(feedback: any, apiKey: string, endpoint: string){
    localStorage.setItem('ApiKey', JSON.stringify(apiKey));
    return this.http.post(endpoint + "feedback", feedback);
  }

}