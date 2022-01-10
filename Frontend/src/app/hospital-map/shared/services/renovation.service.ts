<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
=======
import { HttpClient, HttpHeaders } from '@angular/common/http';
>>>>>>> develop
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
<<<<<<< HEAD
    return this.http.post<SplitRenovation>(this.baseUrl + '/splitRenovations', splitRenovation);
  }

  postMergeRenovation(mergeRenovation: MergeRenovation) : Observable<MergeRenovation> {
    return this.http.post<MergeRenovation>(this.baseUrl + '/mergeRenovations', mergeRenovation)
  }
=======
    return this.http.post<SplitRenovation>(this.baseUrl + 'splitRenovations', splitRenovation);
  }

  postMergeRenovation(mergeRenovation: MergeRenovation) : Observable<MergeRenovation> {
    return this.http.post<MergeRenovation>(this.baseUrl + 'mergeRenovations', mergeRenovation);
  }

  getSplitRenovationsForRoom(roomId: number): Observable<SplitRenovation[]> {
    return this.http.get<SplitRenovation[]>(this.baseUrl + 'splitRenovations/' + roomId);
  }

  getMergeRenovationsForRoom(roomId: number): Observable<MergeRenovation[]> {
    return this.http.get<MergeRenovation[]>(this.baseUrl + 'mergeRenovations/' + roomId);
  }

  deleteSplitRenovation(splitRenovation: SplitRenovation): Observable<SplitRenovation> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: 
      splitRenovation    
    } 
    return this.http.delete<SplitRenovation>(this.baseUrl + 'splitRenovations', options);
  }

  deleteMergeRenovation(mergeRenovation: MergeRenovation): Observable<MergeRenovation> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: 
      mergeRenovation    
    } 
    return this.http.delete<MergeRenovation>(this.baseUrl + 'mergeRenovations', options);
  }

>>>>>>> develop
}
