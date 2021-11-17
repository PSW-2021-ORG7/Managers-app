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
  equipmentFontWeight: string = "light"

  changeMode(mode: string){
    this.changeSearchElementsStyle(mode);
  }

  changeSearchElementsStyle(mode: string){
    if(mode == "rooms"){
      this.roomSelectionColor = "#214975";
      this.roomsFontWeight = "bold"
      this.equipmentSelectionColor = "#a2a2a2";
      this.equipmentFontWeight = "lighter";
    } else if (mode == "equipment"){
      this.roomSelectionColor = "#a2a2a2";
      this.roomsFontWeight = "lighter";
      this.equipmentSelectionColor = "#214975";
      this.equipmentFontWeight = "bold";
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedFloor']) {
        this.selectedFloor = changes.selectedFloor.currentValue;
    }
  }
  

}
