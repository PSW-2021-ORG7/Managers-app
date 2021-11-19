import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private baseUrl: string = 'https://localhost:44342/api/equipment';

  constructor(private http: HttpClient) { }

  getEquipment(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
