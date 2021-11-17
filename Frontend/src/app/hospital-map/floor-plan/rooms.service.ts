import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../models/rooms/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private baseUrl: string = 'https://localhost:44342/api/rooms';

  constructor(private http: HttpClient) { }

  getRooms(buildingId: number): Observable<Room[]> {
    let params = new HttpParams().set('buildingId', buildingId)
    return this.http.get<Room[]>(this.baseUrl, { params: params });
  }

  updateRoom(room: Room): Observable<Room> {
    return this.http.put<Room>(this.baseUrl + '/' + room.id, room);
  }
}
