import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuildingCoordinatesService } from './shared/services/building-coordinates.service';
import { BuildingsService } from './shared/services/buildings.service';
import { D3Service } from './shared/services/d3.service';

@Component({
  selector: 'app-hospital-map',
  templateUrl: './hospital-map.component.html',
  styleUrls: ['./hospital-map.component.scss'],
  providers: [BuildingsService, BuildingCoordinatesService]
})
export class HospitalMapComponent implements OnInit {
  mainBuilding = { id: 0, name: '', description: '', points: '2223.5 1051 2223.5 1405 2078.26 1405 2078.26 1462 1939.37 1462 1939.37 1405 1794.13 1405 1794.13 1434 1662.5 1434 1662.5 1022 1794.13 1022 1794.13 1051 2223.5 1051' }
  buildingCoordinates: any;
  svg: any;
  mainBuildingId: string = 'main-building';

  svgContainer: any;
  svgImage: any;
  viewBox = {x: 1400, y: 790, w: 1920, h: 1080};
  svgSize = {w: 1920 , h: 1080 };
  isPanning = false;
  startPoint = {x: 0, y: 0};
  endPoint = {x: 0, y: 0};;
  scale = this.svgSize.w / this.viewBox.w;
  floorPlanVisible = false;

  constructor(private buildingsService: BuildingsService,
    private buildingCoordinatesService: BuildingCoordinatesService,
    private d3Service: D3Service,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.svgContainer = document.getElementById("map")!;
    this.svgImage = document.getElementById("map-background")!;
    this.svg = this.d3Service.selectById("map-background");
    this.drawMainBuilding();  
    this.buildingsService.getBuildings()
      .subscribe(
        data => {        
          this.applyBuildingData(this.mainBuilding, data[0]);
          this.d3Service.addText(this.svg, this.mainBuilding.name, {x: 2008, y: 1350}, 'main-building-name', 'building-' + this.mainBuilding.id);
          this.d3Service.drawPolygon(this.svg, this.mainBuilding, this.mainBuildingId);
          this.addNavigationToMainBuildingPlan();
        });
  }

  private applyBuildingData(building: any, data: any) {
    building.id = data.id;
    building.name = data.name;
    building.description = data.description;
  }

  private drawMainBuilding() {
    this.buildingCoordinatesService.getCoordinates()
      .subscribe(
        data => {
          this.buildingCoordinates = data,
          this.d3Service.drawMulticoloredRectangles(this.svg, this.buildingCoordinates, this.mainBuildingId);
        });
  }

  private addNavigationToMainBuildingPlan() {
    let mainBuilding = this.d3Service.selectById(this.mainBuildingId);
    let self = this;

    mainBuilding.on('click', function () {
      self.router.navigate(['floor-plan'], { relativeTo: self.route, queryParams: { buildingId: self.mainBuilding.id } })
    })
  }

  mouseWheelFn(e: any) {
    e.preventDefault();
    var w = this.viewBox.w;
    var h = this.viewBox.h;
    var mx = e.offsetX;
    var my = e.offsetY;
    var dw = w * Math.sign(e.deltaY) * 0.05;
    var dh = h * Math.sign(e.deltaY) * 0.05;
    var dx = dw * mx / this.svgSize.w;
    var dy = dh * my / this.svgSize.h;
    this.viewBox = {x: Math.max(1400, this.viewBox.x - dx), y: Math.max(790, this.viewBox.y - dy), w: Math.min(this.viewBox.w + dw, 1920), h: Math.min(this.viewBox.h + dh, 1080)};
    this.scale = this.svgSize.w / this.viewBox.w;
    this.svgImage.setAttribute('viewBox', `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.w} ${this.viewBox.h}`);
  }

  mouseDownFn(e: any): void{
    this.isPanning = true;
    this.startPoint = {x: e.x, y: e.y};   
  }

  mouseMoveFn(e: any): void{
    if (this.isPanning){
      this.endPoint = {x:e.x, y:e.y};
      var dx = (this.startPoint.x - this.endPoint.x) / this.scale;
      var dy = (this.startPoint.y - this.endPoint.y) / this.scale;
      var movedViewBox = {x: this.viewBox.x + dx, y: this.viewBox.y + dy, w: this.viewBox.w, h:this.viewBox.h};
      this.svgImage.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
    }
  }

  mouseUpFn(e: any): void{
    if (this.isPanning){ 
      this.endPoint = {x:e.x, y:e.y};
      var dx = (this.startPoint.x - this.endPoint.x) / this.scale;
      var dy = (this.startPoint.y - this.endPoint.y) / this.scale;
      if(this.viewBox.x + dx + this.viewBox.w > 3320 || this.viewBox.x + dx < 1400)
        dx = 0
      if(this.viewBox.y + dy + this.viewBox.h > 1870 || this.viewBox.y + dy < 790)
        dy = 0
      this.viewBox = {x:this.viewBox.x + dx, y: this.viewBox.y + dy, w: this.viewBox.w, h: this.viewBox.h};
      this.svgImage.setAttribute('viewBox', `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.w} ${this.viewBox.h}`);
      this.isPanning = false;
    }
  }

  mouseLeaveFn(e: any): void{
    this.isPanning = false;
  }

}
