import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '@app/hospital-map/models/doctor/doctor.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Room } from '../../models/rooms/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  
  private baseUrl: string = environment.baseUrlHospital + 'rooms';

  constructor(private http: HttpClient) { }

  getRoom(roomId: number): Observable<Room> {
    return this.http.get<Room>(this.baseUrl + '/' + roomId);
  }

  getRooms(buildingId: number): Observable<Room[]> {
    let params = new HttpParams().set('buildingId', buildingId)
    return this.http.get<Room[]>(this.baseUrl, { params: params });
  }

  getRoomWithEquipment(roomId: number): Observable<Room> {
    return this.http.get<Room>(this.baseUrl + '/' + roomId + '/equipment')
  }

  updateRoom(room: Room): Observable<Room> {
    return this.http.put<Room>(this.baseUrl + '/' + room.id, room);
  }
}
