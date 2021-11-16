import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
  export class AuthenticationService {
      private apiKey: string = 'placeholder';
  
      constructor(private http: HttpClient) { }

      setApiKey(apiKey: string){
          this.apiKey = this.apiKey;
      }

      getApiKey(){
          return this.apiKey
      }
  
   
  }