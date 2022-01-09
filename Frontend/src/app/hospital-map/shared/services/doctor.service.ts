import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Doctor } from "@app/hospital-map/models/doctor/doctor.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DoctorService {

    private baseUrl: string = environment.baseUrlHospital + 'doctor';

    constructor(private http: HttpClient) { }

    getDoctorForRoom(roomId: number): Observable<Doctor> {
        let id = roomId;
        return this.http.get<Doctor>(this.baseUrl + "?roomId=" + roomId);
    }
    
}