import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RoomEquipment } from 'src/app/hospital-map/models/equipment/room-equipment.model';

@Component({
  selector: 'app-equipment-card',
  templateUrl: './equipment-card.component.html',
  styleUrls: ['./equipment-card.component.scss']
})
export class EquipmentCardComponent implements OnChanges{
  

  @Input() equipment!: RoomEquipment;
  @Input() type: string = "map";
  @Input() selectedEquipmentId : number = -1; 
  @Output() notifyDisplayRoom = new EventEmitter<number>();
  @Output() notifySelectedEquipment = new EventEmitter<RoomEquipment>();
  isCardSelected : boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedEquipmentId']) {
      this.selectedEquipmentId = changes.selectedEquipmentId.currentValue;
      if(this.equipment.id == this.selectedEquipmentId)
        this.isCardSelected = true;
      else 
        this.isCardSelected = false;
    }
  }

  displayRoomOnMap() : void{
    this.notifyDisplayRoom.emit(this.equipment.roomId);
  }

  showSelectedEquipment() : void{
    this.notifySelectedEquipment.emit(this.equipment);
  }
}
