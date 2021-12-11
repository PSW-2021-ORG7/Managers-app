import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SplitRenovation } from '@app/hospital-map/models/renovations/split-renovation.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RenovationService {
  private baseUrl: string = environment.baseUrlHospital;

  constructor(private http: HttpClient) { }

  postSplitRenovation(splitRenovation: SplitRenovation): Observable<SplitRenovation> {
    return this.http.post<SplitRenovation>(this.baseUrl + '/splitRenovations', splitRenovation);
  }
}
