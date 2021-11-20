import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { RoomEquipment } from 'src/app/hospital-map/models/equipment/room-equipment.model';
import { Room } from 'src/app/hospital-map/models/rooms/room.model';

@Component({
  selector: 'app-scroll-box',
  templateUrl: './scroll-box.component.html',
  styleUrls: ['./scroll-box.component.scss']
})
export class ScrollBoxComponent implements OnChanges{

  @Input() rooms: Room[] = [];
  @Input() equipment: RoomEquipment[] = [];
  @Input() selectedFloor: number = 0;
  @Input() searchFilter: string = "";
  @Input() isSearchActive: boolean = false;
  @Input() mode: string = "rooms";

  @Output() notifyDisplayRoom = new EventEmitter<number>();
  
  onNotifyDisplayRoom(roomId : number){
    this.notifyDisplayRoom.emit(roomId);
  }



  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedFloor']) {
      this.selectedFloor = changes.selectedFloor.currentValue;
    } 
    else if(changes['searchFilter']){
      this.searchFilter = changes.searchFilter.currentValue;
    }
    else if(changes['isSearchActive']){
      this.isSearchActive = changes.isSearchActive.currentValue;
    }
    else if(changes['mode']){
      this.mode = changes.mode.currentValue;
    }
  }

  

}
