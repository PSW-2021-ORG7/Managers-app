import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildingsService {
    private baseUrl: string = 'https://localhost:44342/api/buildings';

    constructor(private http: HttpClient) { }

    getBuildings(): Observable<any> {
        return this.http.get(this.baseUrl);
    }
}