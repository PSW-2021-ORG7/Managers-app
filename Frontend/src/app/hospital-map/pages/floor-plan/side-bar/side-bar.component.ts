import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { RoomEquipment } from '@hospital-map/models/equipment/room-equipment.model';
import { Room } from '@hospital-map/models/rooms/room.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnChanges {

  constructor(private router: Router){ }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedFloor']) {
        this.selectedFloor = changes.selectedFloor.currentValue;
    }
    else if (changes['isRoomSelected']) {
      this.isRoomSelected = changes.isRoomSelected.currentValue;
    }
    else if (changes['selectedRoomId']) {
      this.selectedRoomId = changes.selectedRoomId.currentValue;
    }
  }

  @Input() rooms: Room[] = [];
  @Input() equipment: RoomEquipment[] = [];
  @Input() selectedFloor: number = 0;
  @Input() isRoomSelected: boolean = false;
  @Input() selectedRoomId: number = -1;
  searchInput: string = "";
  searchFilter: string = "";
  scrollBoxTitle: string = "Rooms on this floor";
  mode: string = "rooms";
  isSearchActive: boolean = false;

  @Output() notifyDisplayRoom = new EventEmitter<number>();
  
  onNotifyDisplayRoom(roomId : number){
    this.notifyDisplayRoom.emit(roomId);
  }

  changeMode(mode: string){
    this.mode = mode;
    if(mode == "rooms"){
      this.scrollBoxTitle = "Rooms on this floor";
    } else if (mode == "equipment"){
      this.scrollBoxTitle = "Equipment on this floor"
    }
  }

  search() : void{
    if(this.searchInput != ""){
      this.isSearchActive = true;
      this.searchFilter = this.searchInput.toLowerCase();
      this.scrollBoxTitle = "Search results";
    }
  }

  removeFilter() : void{
    this.isSearchActive = false;
    this.searchInput = "";
    if(this.mode == "rooms"){
      this.scrollBoxTitle = "Rooms on this floor";
    }
    else if(this.mode == "equipment"){
      this.scrollBoxTitle = "Equipment on this floor";
    }
  }
  
  showRoomDetails() : void{
    if(this.isRoomSelected){
      this.router.navigate(['/hospital-map/rooms/' + this.selectedRoomId]);
    }
  }

  showMakeTransfer(): void{
      this.router.navigate(['/hospital-map/move-equipment']);
  }

}
