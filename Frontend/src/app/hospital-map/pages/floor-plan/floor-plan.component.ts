import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room, RoomType } from '../../models/rooms/room.model';
import { RoomTypeToStringPipe } from '../../shared/pipes/room-type-to-string.pipe';
import { D3Service } from '../../shared/services/d3.service';
import { RoomsService } from '../../shared/services/rooms.service';

@Component({
  selector: 'app-floor-plan',
  templateUrl: './floor-plan.component.html',
  styleUrls: ['./floor-plan.component.scss'],
  providers: [RoomsService]
})

export class FloorPlanComponent implements OnInit {
  buildingId: number = 0;
  svg: any;
  rooms: Room[] = [];
  selectedFloor: number = 0;
  selectedRoomId: number = -1;
  isRoomSelected: boolean = false;
  floors: number[] = [];

  constructor(private d3Service: D3Service, private roomsService: RoomsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
        this.buildingId = params['buildingId'];
        this.roomsService.getRooms(this.buildingId).subscribe(
          data => {
            this.rooms = data;
            this.drawRooms();
            let maxFloor = 0;
            for(const room of data){
              if(room.floor > maxFloor)
                maxFloor = room.floor;
            }
            this.floors = Array(maxFloor+1).fill(0).map((x,i)=>i);
            this.floors.reverse();
          }
        );
    });
  }
  
  onNotifyDisplayRoom(roomId : number){
    this.selectedFloor = this.rooms.find(x => x.id == roomId)!.floor;
    this.selectedFloorChanged(this.selectedFloor);
    this.isRoomSelected = true;
    this.selectedRoomId = roomId;
    this.highlightRoom();
  }

  private drawRooms() {
    this.svg = this.d3Service.selectById('svg-floor');
    this.d3Service.drawPlainRectangles(this.svg, this.rooms, 'main-building-room');
    this.drawRoomNames();
    this.addClickEventToRooms();
    this.filterRooms();   
  }

  private addClickEventToRooms(){
    for (const room of this.rooms){
      let roomComponents = this.d3Service.selectById('room-' + room.id);
      let component = this;
      roomComponents.on('click', function(d: any, i: any){
        component.selectedRoomId = room.id;
        component.isRoomSelected = true;
        component.highlightRoom();
      })
    }
  }

  private filterRooms(): void {
    this.svg.selectAll('.main-building-room')
      .style('visibility', 'hidden');
    this.svg.selectAll('.floor-' + this.selectedFloor)
      .style('visibility', 'visible');
  }

  selectedFloorChanged(selectedFloor: number): void {
    this.selectedFloor = selectedFloor;
    this.selectedRoomId = -1;
    this.isRoomSelected = false;
    this.unhighlightRooms();
    this.filterRooms();
    
  }

  showMapView(): void{
    this.router.navigate(['/hospital-map'], { relativeTo: this.route })
  }

  drawRoomNames(): void {
    const roomTypePipe = new RoomTypeToStringPipe();
    
    for (const room of this.rooms){
      let roomText =  roomTypePipe.transform(room.type) + " " + room.name;
      if(room.type == RoomType.Restroom)
        roomText = room.name + " " + "WC";
      this.d3Service.addText(this.svg, roomText, { x: room.x + room.width/2, y: room.y + room.height/2 }, 'floor-' + room.floor + ' main-building-room', 'room-' + room.id);
    }
    this.svg.selectAll('text')
      .style('font-size', '14px')
  }

  highlightRoom(): void {
    this.unhighlightRooms();
    this.svg.selectAll('#room-' + this.selectedRoomId)
      .style('fill', '#214975');
    this.svg.selectAll('text#room-' + this.selectedRoomId)
      .style('fill', '#ffffff');
  }

  unhighlightRooms() : void{
    this.svg.selectAll('.main-building-room')
      .style('fill', '#cccccc');
    this.svg.selectAll('text')
      .style('fill', '#214975');
  }
}
