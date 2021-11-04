import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildingCoordinatesService {
    private jsonPath: string = 'assets/buildingCoordinates.json';

    constructor(private http: HttpClient) { }

    getCoordinates() : Observable<any> {
        return this.http.get(this.jsonPath);
    }
}