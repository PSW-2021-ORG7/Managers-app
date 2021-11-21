import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room, RoomStatus } from '../../models/rooms/room.model';
import { RoomsService } from '../../shared/services/rooms.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {
  room!: Room;
  roomInfoFormVisible: boolean = false;

  constructor(private roomsService: RoomsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let roomId = params['id'];
      
      this.roomsService.getRoomWithEquipment(roomId).subscribe(
        data => {
          this.room = data;
          console.log(this.room);
      })
    })
  }

  onBackToMap(): void{
    this.router.navigate(['/hospital-map/floor-plan'], { queryParams: {buildingId: this.room.buildingId}})
  }

  showRoomInfoForm(){
    this.roomInfoFormVisible = true;
  }

  showMakeTransfer(): void{
    this.router.navigate(['/hospital-map/move-equipment']);
  }

  onNotifyHideRoomInfo(){
    this.roomInfoFormVisible = false;
  }

  //TODO: Extract to component
  roomStatusColor() : string{
    if(this.room.status == RoomStatus.Unoccupied)
      return "#66A182";
    else if(this.room.status == RoomStatus.Occupied)
      return "#D94848";
    else if(this.room.status == RoomStatus.NotActive)
      return "#A2A2A2";
    else 
      return "#214975";
  }

}
