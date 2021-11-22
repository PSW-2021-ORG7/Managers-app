import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoomEquipment } from 'src/app/hospital-map/models/equipment/room-equipment.model';

@Component({
  selector: 'app-equipment-card',
  templateUrl: './equipment-card.component.html',
  styleUrls: ['./equipment-card.component.scss']
})
export class EquipmentCardComponent {

  @Input() equipment!: RoomEquipment;
  @Input() type: string = "map";
  @Output() notifyDisplayRoom = new EventEmitter<number>();
  @Output() notifySelectedEquipment = new EventEmitter<RoomEquipment>();

  displayRoomOnMap() : void{
    this.notifyDisplayRoom.emit(this.equipment.roomId);
  }

  showSelectedEquipment() : void{
    this.notifySelectedEquipment.emit(this.equipment)
  }
}
