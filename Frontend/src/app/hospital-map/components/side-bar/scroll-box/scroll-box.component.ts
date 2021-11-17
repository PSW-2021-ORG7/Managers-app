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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedFloor']) {
        this.selectedFloor = changes.selectedFloor.currentValue;
    }
  }

}
