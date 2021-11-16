import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private apiKey: string = 'ABC';
  authService: AuthenticationService | undefined

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const ApiKey = "ABC";
      const modifiedReq = req.clone({ 
        headers: req.headers.set('ApiKey', this.apiKey),
      });
    return next.handle(modifiedReq)
    .pipe();
  }
}