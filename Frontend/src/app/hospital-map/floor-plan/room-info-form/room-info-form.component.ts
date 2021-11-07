import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-room-info-form',
  templateUrl: './room-info-form.component.html',
  styleUrls: ['./room-info-form.component.css']
})
export class RoomInfoFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() notifyHideRoomInfo: EventEmitter<any> = new EventEmitter<any>();

  hideRoomInfoForm(){
    this.notifyHideRoomInfo.emit();
  }

}
