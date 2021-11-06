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
  // data = [
  //   {x: 265, y: 466, width: 234, height: 284},
  //   {x: 9, y: 9, width: 255, height: 246},
  //   {x: 859, y: 65, width: 235, height: 190},
  //   {x: 499, y: 65, width: 360, height: 190},
  //   {x: 264, y: 65, width: 235, height: 190},
  //   {x: 868, y: 577.63, width: 226, height: 172.37},
  //   {x: 868, y: 405, width: 226, height: 172.37},
  //   {x: 9, y: 563, width: 256, height: 243},
  //   {x: 9, y: 255, width: 119, height: 154},
  //   {x: 9, y: 409, width: 119, height: 154}
  // ];
  // buildingId: string = '';
  // svg: any;

  constructor(private d3Service: D3Service, private roomsService: RoomsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // TODO: Fetch data from API
    // this.route.queryParams.subscribe(params => {
    //   this.buildingId = params['buildingId'];

    //   this.roomsService.getRooms(this.buildingId).subscribe(
    //     data => {
    //       this.svg = this.d3Service.createSvg(`-300 -110 2000 1000`);
    //       this.d3Service.drawRectangles(this.svg, this.data, 'main-building-room');
    //     }
    //   );
    // });

    // this.svg = this.d3Service.createSvg(`-300 -110 2000 1000`);
    // this.d3Service.drawRectangles(this.svg, this.data, 'main-building-room');
  }

}
