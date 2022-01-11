import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OnCallShift } from "@app/hospital-map/models/shift/on-call-shift.model";
import { Shift } from "@app/hospital-map/models/shift/shift.model";
import { WorkdayShift } from "@app/hospital-map/models/shift/workday-shift.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class ShiftService{
    
    private baseUrl: string = environment.baseUrlHospital;
    
    constructor(private http: HttpClient) { }

    getShiftWorkdaysForDoctor(doctorId: number): Observable<WorkdayShift[]>{
        return this.http.get<WorkdayShift[]>(this.baseUrl + 'shifts' + "/doctor/" + doctorId);
    }

    getShiftsFromDate(startDate: string): Observable<Shift[]> {
        return this.http.get<Shift[]>(this.baseUrl + 'shifts' + '?start=' + startDate);
    }

    assignShiftToDoctor(workday: Object) : Observable<any> {
        return this.http.post<Observable<any>>(this.baseUrl + 'workdays', workday);
    }

    getShift(id: number): Observable<Shift> {
        return this.http.get<Shift>(this.baseUrl + 'shifts' + "/" + id);
    }
    
    removeShiftFromDoctor(workdayId: number) : Observable<any> {
          return this.http.delete<Observable<any>>(this.baseUrl + 'workdays/' + workdayId);
    }
     
    getAllShifts(): Observable<Shift[]> {
        return this.http.get<Shift[]>(this.baseUrl + 'shifts');
    }
    
    postShift(shift: Object): Observable<Shift> {
        return this.http.post<Shift>(this.baseUrl + 'shifts', shift);
    }
    
    putShift(shift: Shift): Observable<Shift> {
        return this.http.put<Shift>(this.baseUrl + 'shifts', shift);
    }
    
    deleteShift(shift: Shift): Observable<Shift> {
        const options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
          body: 
          shift    
        }
        return this.http.delete<Shift>(this.baseUrl + 'shifts', options);
    }

    getOnCallShifts(doctorId: number): Observable<OnCallShift[]>{
        return this.http.get<OnCallShift[]>(this.baseUrl + "onCallShifts/doctor/" + doctorId);
    }

    postOnCallShift(onCallShift: Object) : Observable<any>{
        return this.http.post<Observable<any>>(this.baseUrl + "onCallShifts", onCallShift);
    }
    
    deleteOnCallShift(onCallShift: OnCallShift) : Observable<OnCallShift>{
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
            body: 
            onCallShift    
        }
        return this.http.delete<OnCallShift>(this.baseUrl + "onCallShifts", options);        
    }

}