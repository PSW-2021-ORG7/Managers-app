import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Room } from 'src/app/hospital-map/models/rooms/room.model';

@Component({
  selector: 'app-scroll-box',
  templateUrl: './scroll-box.component.html',
  styleUrls: ['./scroll-box.component.scss']
})
export class ScrollBoxComponent implements OnChanges{

  @Input() rooms: Room[] = [];
  @Input() selectedFloor: number = 0;
  @Input() searchFilter: string = "";
  @Input() isSearchActive: boolean = false;
  @Input() mode: string = "rooms";

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
