import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuildingsService {
    private baseUrl: string = environment.baseUrlHospital + 'buildings';

    constructor(private http: HttpClient) { }

    getBuildings(): Observable<any> {
        return this.http.get(this.baseUrl);
    }
}