import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Room, RoomStatus } from 'src/app/hospital-map/models/rooms/room.model';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss']
})
export class RoomCardComponent {

  @Input() room!: Room;
  @Output() notifyDisplayRoom = new EventEmitter<number>();

  roomStatusColor() : string{
    if(this.room.status == RoomStatus.Unoccupied)
      return "#66A182";
    else if(this.room.status == RoomStatus.Occupied)
      return "#D94848";
    else if(this.room.status == RoomStatus.NotActive)
      return "#A2A2A2";
    else 
      return "#214975";
  }

  displayRoomOnMap(){
    this.notifyDisplayRoom.emit(this.room.id);
  }

}
