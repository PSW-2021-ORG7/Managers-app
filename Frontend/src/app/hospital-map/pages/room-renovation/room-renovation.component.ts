import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewRoomInfo } from '@app/hospital-map/models/renovations/new-room-info.model';
import { SplitRenovation } from '@app/hospital-map/models/renovations/split-renovation.model';
import { RenovationService } from '@app/hospital-map/shared/services/renovation.service';
import { Room, RoomStatus, RoomType } from '../../models/rooms/room.model';
import { RoomTypeToStringPipe } from '../../shared/pipes/room-type-to-string.pipe';
import { D3Service } from '../../shared/services/d3.service';
import { RoomsService } from '../../shared/services/rooms.service';

@Component({
  selector: 'app-room-renovation',
  templateUrl: './room-renovation.component.html',
  styleUrls: ['./room-renovation.component.scss']
})
export class RoomRenovationComponent implements OnInit {

  roomsOnThisFloor : Room[] = [];
  room!: Room;
  renovationType: string = "null";
  equipmentDestination: string = "first";
  roomStatuses: RoomStatus[] = [
    RoomStatus.Occupied,
    RoomStatus.Unoccupied,
    RoomStatus.IsBeingRenovated,
    RoomStatus.NotActive
  ];
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
  ];
  svg : any;
  newRoom1Name : string = "New room 1";
  newRoom2Name : string = "New room 2";
  splitRenovation: SplitRenovation = new SplitRenovation(-1, new NewRoomInfo('', RoomType.OperatingRoom, RoomStatus.Occupied), new NewRoomInfo('', RoomType.OperatingRoom, RoomStatus.Occupied), new Date(), new Date(), '');

  constructor(private roomsService: RoomsService, private route: ActivatedRoute, private router: Router, private d3Service: D3Service, private renovationService: RenovationService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let roomId = params['id'];
      this.roomsService.getRoom(roomId).subscribe(
        data => {
          this.room = data;
          this.roomsService.getRooms(this.room.buildingId).subscribe(
            data => {
              this.roomsOnThisFloor = data.filter(r => r.floor == this.room.floor);
              this.drawRooms();
              this.drawRoomNames();
              this.hightlightRoom(this.room.id);
          });
      });
    })
  }
  
  onRenovationTypeChange(): void {
      if(this.renovationType == "split"){
        this.splitRenovation.roomId = this.room.id;
        this.drawSplitLine();
        this.updateRoomText();
      }
      else if(this.renovationType == "merge"){
        this.removeSplitInfo();
      }
  }
 
  onBackToRoomDetails(): void{
    this.router.navigate(['/hospital-map/rooms/' + this.room.id])
  }

  drawRooms() : void{
    this.svg = this.d3Service.selectById('svg-floor');
    this.d3Service.drawPlainRectangles(this.svg, this.roomsOnThisFloor, 'main-building-room');
  }

  drawRoomNames(): void {
    const roomTypePipe = new RoomTypeToStringPipe();
    for (const room of this.roomsOnThisFloor){
      let roomText =  roomTypePipe.transform(room.type) + " " + room.name;
      if(room.type == RoomType.Restroom)
        roomText = room.name + " " + "WC";
      this.d3Service.addText(this.svg, roomText, { x: room.x + room.width/2, y: room.y + room.height/2 }, 'floor-' + room.floor + ' main-building-room', 'room-' + room.id);
    }
    this.svg.selectAll('text')
      .style('font-size', '14px')
  }

  hightlightRoom(roomId: number) : void {
    this.svg.selectAll('#room-' + roomId)
      .style('fill', '#214975');
    this.svg.selectAll('text#room-' + roomId)
      .style('fill', '#ffffff');
  }

  drawSplitLine(): void {
    let roomSvg = this.d3Service.selectById("svg-floor");
    roomSvg.append('line')
      .attr('id', "room-split-line")
      .style("stroke", "white")
      .style("stroke-width", 7)
      .attr("x1", this.room.x)
      .attr("y1", this.room.y + this.room.height/2)
      .attr("x2", this.room.x + this.room.width)
      .attr("y2", this.room.y + this.room.height/2); 
  }

  updateRoomText() : void {
    this.svg.selectAll('text#room-' + this.room.id)
      .remove();
    this.d3Service.addText(this.svg, this.newRoom1Name, { x: this.room.x + this.room.width/2, y: this.room.y + this.room.height/4 + 5 }, 'floor-' + this.room.floor + ' main-building-room', 'room-' + this.room.id);
    this.d3Service.addText(this.svg, this.newRoom2Name, { x: this.room.x + this.room.width/2, y: this.room.y + 3*this.room.height/4 + 5 }, 'floor-' + this.room.floor + ' main-building-room', 'room-' + this.room.id);
    this.svg.selectAll('text#room-' + this.room.id)
      .style('fill', '#ffffff')
      .style('font-size', '14px');
  }
  
  removeSplitInfo() {
    this.svg.selectAll('text#room-' + this.room.id)
      .remove();
    this.d3Service.selectById('room-split-line').remove();
    const roomTypePipe = new RoomTypeToStringPipe();
    let roomText =  roomTypePipe.transform(this.room.type) + " " + this.room.name;
    if(this.room.type == RoomType.Restroom)
      roomText = this.room.name + " " + "WC";
    this.d3Service.addText(this.svg, roomText, { x: this.room.x + this.room.width/2, y: this.room.y + this.room.height/2 }, 'floor-' + this.room.floor + ' main-building-room', 'room-' + this.room.id);
    this.svg.selectAll('text#room-' + this.room.id)
      .style('fill', '#ffffff')
      .style('font-size', '14px');
  }

  scheduleRenovation() {
    if(this.renovationType == 'split'){
      this.splitRenovation.firstNewRoomInfo.roomName = this.newRoom1Name;
      this.splitRenovation.secondNewRoomInfo.roomName = this.newRoom2Name;
      if(this.equipmentDestination == 'first'){
        this.splitRenovation.equipmentDestination = this.newRoom1Name;
      } else {
        this.splitRenovation.equipmentDestination = this.newRoom2Name;
      }

      this.renovationService.postSplitRenovation(this.splitRenovation).subscribe();
      this.router.navigate(['/hospital-map/']);
    }
  }

}
