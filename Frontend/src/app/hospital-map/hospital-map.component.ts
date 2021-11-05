import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuildingCoordinatesService } from './shared/building-coordinates.service';
import { BuildingsService } from './shared/buildings.service';
import { D3Service } from './shared/d3.service';

@Component({
  selector: 'app-hospital-map',
  templateUrl: './hospital-map.component.html',
  styleUrls: ['./hospital-map.component.css'],
  providers: [BuildingsService, BuildingCoordinatesService]
})
export class HospitalMapComponent implements OnInit {
  mainBuilding = { id: '', name: '', description: '', points: '565 33 565 387 419.76 387 419.76 444 280.87 444 280.87 387 135.63 387 135.63 416 4 416 4 4 135.63 4 135.63 33 565 33' }
  buildingCoordinates: any;
  svg: any;
  mainBuildingId: string = 'main-building';

  constructor(private buildingsService: BuildingsService,
    private buildingCoordinatesService: BuildingCoordinatesService,
    private d3Service: D3Service,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.svg = this.d3Service.createSvg(`-300 -120 2000 606`);

    this.buildingsService.getBuildings()
      .subscribe(
        data => {        
          this.applyBuildingData(this.mainBuilding, data[0]);
          this.drawObjects();  
        });
  }

  private applyBuildingData(building: any, data: any) {
    building.id = data.id;
    building.name = data.name;
    building.description = data.description;
  }

  private drawObjects() {
    this.buildingCoordinatesService.getCoordinates()
      .subscribe(
        data => {
          this.buildingCoordinates = data,
          this.d3Service.drawRectangles(this.svg, this.buildingCoordinates, this.mainBuildingId);
          this.d3Service.addText(this.svg, this.mainBuilding.name, {x: 228, y: 335});
          this.d3Service.drawPolygon(this.svg, this.mainBuilding, this.mainBuildingId);

          this.addNavigationToMainBuildingPlan();
        });
  }

  private addNavigationToMainBuildingPlan() {
    let mainBuilding = this.d3Service.selectById(this.mainBuildingId);
    let component = this;

    mainBuilding.on('click', function () {
      component.router.navigate(['floor-plan'], { relativeTo: component.route, queryParams: { buildingId: component.mainBuilding.id } })
    })
  }

}
