import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var ApiKey = "";
    if(localStorage.getItem('ApiKey') != null){
      ApiKey = JSON.parse(localStorage.getItem('ApiKey') || '')
    } 
      const modifiedReq = req.clone({ 
        headers: req.headers.set('ApiKey', ApiKey)           
      });
    return next.handle(modifiedReq)
    .pipe();
  }
}