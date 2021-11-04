import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as d3 from 'd3';
import { BuildingsService } from './buildings.service';
import { BuildingCoordinatesService } from './building-coordinates.service';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css'],
  providers: [BuildingsService, BuildingCoordinatesService]
})
export class BuildingsComponent implements OnInit {
  mainBuilding = { name: '', description: '', points: '565 33 565 387 419.76 387 419.76 444 280.87 444 280.87 387 135.63 387 135.63 416 4 416 4 4 135.63 4 135.63 33 565 33' }
  buildingCoordinates: any;
  svg: any;

  constructor(private buildingsService: BuildingsService,
    private buildingCoordinatesService: BuildingCoordinatesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createSvg();

    this.buildingsService.getBuildings()
      .subscribe(
        data => {
          this.applyBuildingData(this.mainBuilding, data[0]);
          this.drawObjects();
        });
  }

  private createSvg(): void {
    this.svg = d3.select('div#canvas')
      .append('svg')
      .attr('viewBox', `-300 -120 2000 606`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g');
  }

  private applyBuildingData(building: any, data: any) {
    building.name = data.name;
    building.description = data.description;
  }

  private drawObjects() {
    this.buildingCoordinatesService.getCoordinates()
      .subscribe(
        data => {
          this.buildingCoordinates = data,
          this.drawRectangles(this.buildingCoordinates, 'building-coordinates');
          this.addBuildingName(this.mainBuilding.name, {x: 228, y: 335});
          this.drawPolygon(this.mainBuilding, 'main-building');
          this.addNavigationToMainBuildingPlan();
        });
  }

  private drawRectangles(data: any[], className: string): void {
    this.svg.selectAll('.' + className)
      .data(data)
      .enter()
      .append('rect')
      .attr('x', function (d: { x: any; }) { return d.x; })
      .attr('y', function (d: { y: any; }) { return d.y; })
      .attr('width', function (d: { width: any; }) { return d.width; })
      .attr('height', function (d: { height: any; }) { return d.height; })
      .attr('fill', function (d: { fill: any; }) { return d.fill; })
      .attr('stroke', function (d: { stroke: any; }) { return d.stroke; })
      .attr('stroke-width', 8)
      .attr('class', className);
  }

  private drawPolygon(data: any, idName: string) {
    this.svg.append('polygon')
      .attr('points', data.points)
      .attr('id', idName)
      .style('fill', 'transparent');
  }

  private addNavigationToMainBuildingPlan() {
    let mainBuilding = d3.selectAll('#main-building');
    let component = this;

    mainBuilding.on('click', function () {
      component.router.navigate(['plan'], { relativeTo: component.route, queryParams: { building: 'mainBuilding' } })
    })
  }

  private addBuildingName(name: string, coords: {x: number, y: number}) {
    this.svg.append('text')
      .attr('x', coords.x)
      .attr('y', coords.y)
      .text(name)
      .style('fill', '#214975')
      .attr('font-size', '1.563rem');
  }
}

