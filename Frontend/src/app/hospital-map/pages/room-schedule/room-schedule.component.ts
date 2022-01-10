import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MergeRenovation } from '@app/hospital-map/models/renovations/merge-renovation.model';
import { SplitRenovation } from '@app/hospital-map/models/renovations/split-renovation.model';
import { RenovationService } from '@app/hospital-map/shared/services/renovation.service';
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
  splitRenovations: SplitRenovation[] = [];
  mergeRenovations: MergeRenovation[] = [];

  constructor(private renovationService : RenovationService, private equipmentTransferService: EquipmentTransferService, private roomsService: RoomsService, private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService) { }
  
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
        }
      );
      this.renovationService.getSplitRenovationsForRoom(this.roomId).subscribe(
        data => {
          this.splitRenovations = data;
          this.spinner.hide();
        }
      );
      this.renovationService.getMergeRenovationsForRoom(this.roomId).subscribe(
        data => {
          this.mergeRenovations = data;
          this.spinner.hide();
        }
      );
    });
  }

  onBackToRoomDetails(): void{
    this.router.navigate(['/hospital-map/rooms/' + this.roomId])
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
