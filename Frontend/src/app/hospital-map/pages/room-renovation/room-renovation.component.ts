import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room, RoomStatus, RoomType } from '../../models/rooms/room.model';
import { RoomsService } from '../../shared/services/rooms.service';

@Component({
  selector: 'app-room-renovation',
  templateUrl: './room-renovation.component.html',
  styleUrls: ['./room-renovation.component.scss']
})
export class RoomRenovationComponent implements OnInit, OnChanges {
  room!: Room;
  renovationType: number = 0;
  isRenovationTypeSelected: boolean = false;
  isRenovationTypeMerge: boolean = false;
  isRenovationTypeSplit: boolean = false;
  
  roomStatuses: RoomStatus[] = [
    RoomStatus.Occupied,
    RoomStatus.Unoccupied,
    RoomStatus.IsBeingRenovated,
    RoomStatus.NotActive
  ]
  roomTypes: RoomType[] = [
    RoomType.OperatingRoom,
    RoomType.SurgeryRoom,
    RoomType.ExaminationRoom,
    RoomType.EmergencyRoom,
    RoomType.DoctorOffice,
    RoomType.Restroom,
    RoomType.Lift,
    RoomType.Stairs,
    RoomType.Storage
  ]

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
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['renovationType']){
      this.renovationType = changes.renovationType.currentValue;
      this.changeRenovationType();
    }
  }
  
  changeRenovationType(): void {
    if (this.renovationType == 0){
      this.isRenovationTypeSelected = false;
      this.isRenovationTypeMerge = false;
      this.isRenovationTypeSplit = false;
    }else if (this.renovationType == 1){
      this.isRenovationTypeSelected = true;
      this.isRenovationTypeMerge = true;
      this.isRenovationTypeSplit = false;
    }else{
      this.isRenovationTypeSelected = true;
      this.isRenovationTypeMerge = false;
      this.isRenovationTypeSplit = true;
    }
  }


  onBackToRoomDetails(): void{
    this.router.navigate(['/hospital-map/rooms/' + this.room.id])
  }





}
