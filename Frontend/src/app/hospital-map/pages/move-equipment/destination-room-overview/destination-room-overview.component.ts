import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { EquipmentTransfer } from 'src/app/hospital-map/models/equipment/equipment-transfer.model';
import { Room } from 'src/app/hospital-map/models/rooms/room.model';
import { RoomTypeToStringPipe } from 'src/app/hospital-map/shared/pipes/room-type-to-string.pipe';
import { RoomsService } from 'src/app/hospital-map/shared/services/rooms.service';

@Component({
  selector: 'app-destination-room-overview',
  templateUrl: './destination-room-overview.component.html',
  styleUrls: ['./destination-room-overview.component.scss'],
  providers: [ RoomTypeToStringPipe ]
})
export class DestinationRoomOverviewComponent implements OnInit {

  rooms: Room[] = [];
  isRoomSelected: boolean = false;
  filteredRooms: Room[] = [];
  searchInput: string = "";
  searchFilter: string = "";
  scrollBoxTitle: string = "Select destination room";
  isSearchActive: boolean = false;
  @Input() equipmentTransfer!: EquipmentTransfer;
  @Output() selectDestinationRoomEvent = new EventEmitter();

  constructor(private roomsService: RoomsService, private roomTypeToStringPipe: RoomTypeToStringPipe) { }

  ngOnInit(): void {
    this.roomsService.getRooms(1).subscribe(
      data => {
        for (const room of data){
          if (room.id != this.equipmentTransfer.sourceRoomId){
            this.rooms.push(room);
            this.filteredRooms.push(room);
          }
        }
      }
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['isRoomSelected']){
      this.isRoomSelected = changes.isEquipmentSelected.currentValue;
    }
  }

  search() : void{
    if(this.searchInput != ""){
      this.searchFilter = this.searchInput.toLowerCase();
      this.scrollBoxTitle = "Search results";
      this.isSearchActive = true;

      let rooms = this.rooms;
      rooms = rooms.filter(param => (this.roomTypeToStringPipe.transform(param.type) + param.name).toLowerCase().includes(this.searchFilter));
      this.filteredRooms = rooms;
    }
  }

  removeFilter() : void{
    this.isSearchActive = false;
    this.searchInput = "";
    this.filteredRooms = this.rooms;
  }

  selectDestinationRoom(id: number) : void{
    this.equipmentTransfer.destinationRoomId = id;
    this.selectDestinationRoomEvent.emit();
  }

}
