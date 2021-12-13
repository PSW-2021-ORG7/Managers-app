import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoomStatus, RoomType } from '@hospital-map/models/rooms/room.model';
import { RoomsService } from '@hospital-map/shared/services/rooms.service';

@Component({
  selector: 'app-room-info-form',
  templateUrl: './room-info-form.component.html',
  styleUrls: ['./room-info-form.component.scss']
})
export class RoomInfoFormComponent{
  @Input() selectedRoom: any;
  roomStatuses: RoomStatus[] = [
    RoomStatus.Occupied,
    RoomStatus.Unoccupied,
    RoomStatus.IsBeingRenovated,
    RoomStatus.NotActive
  ]
  roomTypes: RoomType[] = [
    RoomType.OperatingRoom,
    RoomType.SurgeryRoom,
    RoomType.ExaminationRoom,
    RoomType.EmergencyRoom,
    RoomType.DoctorOffice,
    RoomType.Restroom,
    RoomType.Lift,
    RoomType.Stairs,
    RoomType.Storage
  ]
  constructor(private roomsService: RoomsService) { }

  @Output() notifyHideRoomInfo: EventEmitter<any> = new EventEmitter<any>();

  hideRoomInfoForm(){
    this.notifyHideRoomInfo.emit();
  }

  updateRoomInfo(): void{
    this.roomsService.updateRoom(this.selectedRoom).subscribe();
    this.hideRoomInfoForm();
  }

}
