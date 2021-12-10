import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EquipmentTransfer } from '../../models/equipment/equipment-transfer.model';
import { Room, RoomType } from '../../models/rooms/room.model';
import { RoomTypeToStringPipe } from '../../shared/pipes/room-type-to-string.pipe';
import { EquipmentTransferService } from '../../shared/services/equipment-tranfser.service';
import { RoomsService } from '../../shared/services/rooms.service';

@Component({
  selector: 'app-room-schedule',
  templateUrl: './room-schedule.component.html',
  styleUrls: ['./room-schedule.component.scss']
})
export class RoomScheduleComponent implements OnInit{

  roomId! : number;
  room! : Room;
  showServerErrorMessage : boolean = false;
  equipmentTransfers : EquipmentTransfer[] = [];

  constructor(private equipmentTransferService: EquipmentTransferService, private roomsService: RoomsService, private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService) { }
  
  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.showServerErrorMessage = true;
    }, 5000);
    this.route.params.subscribe(params => {
      this.roomId = params['id'];
      this.roomsService.getRoom(this.roomId).subscribe(
        data => {
          this.room = data;
        }
      );
      this.equipmentTransferService.getTransfersForRoom(this.roomId).subscribe(
        data => {
          this.equipmentTransfers = data;
          this.spinner.hide();
          this.showServerErrorMessage = true;
        }
      );
    });
  }

  onBackToRoomDetails(): void{
    this.router.navigate(['/hospital-map/'])
  }

  public getRoomText(){
    const roomTypePipe = new RoomTypeToStringPipe();
    if(this.room){
        let roomText =  roomTypePipe.transform(this.room.type) + " " + this.room.name;
        if(this.room.type == RoomType.Restroom)
          roomText = this.room.name + " " + "WC";
        return roomText;
    } else {
      return null;
    }
      
  }
  
}
