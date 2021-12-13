import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private baseUrl: string = environment.baseUrlHospital + 'equipment';

  constructor(private http: HttpClient) { }

  getEquipment(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  
}
