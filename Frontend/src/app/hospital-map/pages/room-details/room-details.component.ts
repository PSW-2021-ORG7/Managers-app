import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '@app/hospital-map/models/doctor/doctor.model';
import { DoctorService } from '@app/hospital-map/shared/services/doctor.service';
import { Room, RoomStatus } from '../../models/rooms/room.model';
import { RoomsService } from '../../shared/services/rooms.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {
  room!: Room;
  doctor!: Doctor;
  roomInfoFormVisible: boolean = false;
  menuVisible: boolean = false;

  constructor(private roomsService: RoomsService, private doctorService: DoctorService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let roomId = params['id'];
      
      this.roomsService.getRoomWithEquipment(roomId).subscribe(
        data => {
          this.room = data;
      })
      this.doctorService.getDoctorForRoom(roomId).subscribe(
        data => {
          this.doctor = data;
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

  showRoomRenovation(): void{
    this.router.navigate(['/hospital-map/room-renovation/' + this.room.id])
  }

  showRoomSchedule(): void{
    this.router.navigate(['/hospital-map/room-schedule/' + this.room.id])
  }

  showManageDoctor(): void{
    if(this.doctor != null && this.room != null)
      this.router.navigate(['/hospital-map/manage-doctor/' + this.doctor.id], { state: { roomId: this.room.id } })
    else
      alert("This room doesn't have a doctor!");
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

  toggleMenu(): void{
    this.menuVisible = !this.menuVisible;
  }

}
