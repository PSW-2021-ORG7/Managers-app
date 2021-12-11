import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MergeRenovation } from '@app/hospital-map/models/renovations/merge-renovation.model';
import { SplitRenovation } from '@app/hospital-map/models/renovations/split-renovation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RenovationService {
  private baseUrl: string = 'https://localhost:44342/api';

  constructor(private http: HttpClient) { }

  postSplitRenovation(splitRenovation: SplitRenovation): Observable<SplitRenovation> {
    return this.http.post<SplitRenovation>(this.baseUrl + '/splitRenovations', splitRenovation);
  }

  postMergeRenovation(mergeRenovation: MergeRenovation) : Observable<MergeRenovation> {
    return this.http.post<MergeRenovation>(this.baseUrl + '/mergeRenovations', mergeRenovation)
  }
}
