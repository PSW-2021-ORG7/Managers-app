import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurroundingObjectsService {
    private jsonPath: string = 'assets/surroundingObjects.json';

    constructor(private http: HttpClient) { }

    getSurroundingObjects() : Observable<any> {
        return this.http.get(this.jsonPath);
    }
}