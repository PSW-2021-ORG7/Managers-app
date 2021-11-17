import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room, RoomType } from '../../models/rooms/room.model';
import { D3Service } from '../../shared/services/d3.service';
import { RoomsService } from './rooms.service';

@Component({
  selector: 'app-floor-plan',
  templateUrl: './floor-plan.component.html',
  styleUrls: ['./floor-plan.component.scss'],
  providers: [RoomsService]
})

export class FloorPlanComponent implements OnInit {
  @Input() buildingId: number = 0;
  svg: any;
  rooms: Room[] = [];
  selectedFloor: number = 0;
  @Input() selectedRoom: Room | undefined;
  roomInfoFormVisible: boolean = false;
  roomSelected: boolean = false;
  @Output() notifyShowMapView: EventEmitter<any> = new EventEmitter<any>();

  constructor(private d3Service: D3Service, private roomsService: RoomsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.roomsService.getRooms(this.buildingId).subscribe(
      data => {
        this.rooms = data;
        this.drawRooms();
        
        let rooms = this.d3Service.selectByClass('main-building-room');
        let component = this;
        rooms.on('click', function(d: any, i: any){
          component.selectedRoom = i;
          component.roomSelected = true;
        })
      }
    );
  }

  private drawRooms() {
    this.svg = this.d3Service.selectById('svg-floor');
    this.d3Service.drawPlainRectangles(this.svg, this.rooms, 'main-building-room');
    this.drawRoomNames();
    this.filterRooms();   
  }

  private filterRooms(): void {
    this.svg.selectAll('.main-building-room')
      .style('visibility', 'hidden');
    this.svg.selectAll('.floor-' + this.selectedFloor)
      .style('visibility', 'visible');
  }

  selectedFloorChanged(selectedFloor: number): void {
    this.selectedFloor = selectedFloor; 
    this.filterRooms();
    this.roomSelected = false;
  }

  showMapView(): void{
    this.notifyShowMapView.emit();
  }

  showRoomInfoForm(){
    this.roomInfoFormVisible = true;
  }

  onNotifyHideRoomInfo(){
    this.roomInfoFormVisible = false;
  }

  drawRoomNames(): void {
    for (const room of this.rooms){
      this.d3Service.addText(this.svg, RoomType[room.type] + ' ' + room.name, { x: room.x + room.width/2, y: room.y + room.height/2 }, 'floor-' + room.floor + ' main-building-room');
    }
    this.svg.selectAll('text')
      .style('font-size', '14px')
  }

}
