import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MergeRenovation } from '@app/hospital-map/models/renovations/merge-renovation.model';
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
    return this.http.post<SplitRenovation>(this.baseUrl + 'splitRenovations', splitRenovation);
  }

  postMergeRenovation(mergeRenovation: MergeRenovation) : Observable<MergeRenovation> {
    return this.http.post<MergeRenovation>(this.baseUrl + 'mergeRenovations', mergeRenovation)
  }

  getSplitRenovationsForRoom(roomId: number): Observable<SplitRenovation[]> {
    return this.http.get<SplitRenovation[]>(this.baseUrl + 'splitRenovations/' + roomId);
  }

  getMergeRenovationsForRoom(roomId: number): Observable<MergeRenovation[]> {
    return this.http.get<MergeRenovation[]>(this.baseUrl + 'mergeRenovations/' + roomId);
  }
}
