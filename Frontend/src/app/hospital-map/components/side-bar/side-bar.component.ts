import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Room } from '../../models/rooms/room.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnChanges {

  @Input() rooms: Room[] = [];
  @Input() selectedFloor: number = 0;
  roomSelectionColor: string = "#214975";
  equipmentSelectionColor: string = "#a2a2a2";
  roomsFontWeight: string = "bold";
  equipmentFontWeight: string = "light";
  searchInput: string = "";
  searchFilter: string = "";
  scrollBoxTitle: string = "Rooms on this floor"
  mode: string = "rooms";
  isSearchActive: boolean = false;

  changeMode(mode: string){
    this.mode = mode;
    this.changeSearchElementsStyle(mode);
  }

  changeSearchElementsStyle(mode: string){
    if(mode == "rooms"){
      this.roomSelectionColor = "#214975";
      this.roomsFontWeight = "bold"
      this.equipmentSelectionColor = "#a2a2a2";
      this.equipmentFontWeight = "lighter";
      this.scrollBoxTitle = "Rooms on this floor";
    } else if (mode == "equipment"){
      this.roomSelectionColor = "#a2a2a2";
      this.roomsFontWeight = "lighter";
      this.equipmentSelectionColor = "#214975";
      this.equipmentFontWeight = "bold";
      this.scrollBoxTitle = "Equipment on this floor"
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedFloor']) {
        this.selectedFloor = changes.selectedFloor.currentValue;
    }
  }

  search() : void{
    if(this.searchInput != ""){
      this.isSearchActive = true;
      this.searchFilter = this.searchInput;
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
  

}
