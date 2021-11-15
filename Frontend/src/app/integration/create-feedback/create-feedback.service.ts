import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const ApiKey = 'ABC';
      const modifiedReq = req.clone({ 
        headers: req.headers.set('ApiKey', ApiKey),
      });
    return next.handle(modifiedReq);
  }
}

@Injectable({
  providedIn: 'root'
})
export class CreateFeedbackService {
    private baseUrl: string = 'http://localhost:44298/api/pharmacies';

    constructor(private http: HttpClient) { }

    getPharmacies(): Observable<any> {
      
        return this.http.get(this.baseUrl);
    }
}