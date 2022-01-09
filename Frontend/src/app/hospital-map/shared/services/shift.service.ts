import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Shift } from "@app/hospital-map/models/shift/shift.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class ShiftService{

    private baseUrl: string = environment.baseUrlHospital + 'shifts';
    
    constructor(private http: HttpClient) { }

    getShiftsFromDate(startDate: string): Observable<Shift[]> {
        return this.http.get<Shift[]>(this.baseUrl + '?start=' + startDate);
    }
}