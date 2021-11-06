import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { D3Service } from '../shared/d3.service';
import { RoomsService } from './rooms.service';


@Component({
  selector: 'app-floor-plan',
  templateUrl: './floor-plan.component.html',
  styleUrls: ['./floor-plan.component.css'],
  providers: [RoomsService]
})
export class FloorPlanComponent implements OnInit {
  buildingId: string = '';
  svg: any;

  selectedFloor: any = 0;

  selectedFloorChanged(e: any): void{
    console.log(this.selectedFloor)
  }

  constructor(private d3Service: D3Service, private roomsService: RoomsService, private route: ActivatedRoute) {
    this.selectedFloor = 0;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.buildingId = params['buildingId'];

      this.roomsService.getRooms(this.buildingId).subscribe(
        data => {
          this.svg = this.d3Service.selectById('svg-floor');
          this.d3Service.drawRectangles(this.svg, data, 'main-building-room');
          this.d3Service.addFillAndStroke(this.svg, 'main-building-room');
        }
      );
    });

  }

}
