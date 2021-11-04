import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { BuildingsService } from './buildings.service';
import { SurroundingObjectsService } from './surrounding-objects.service';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css'],
  providers: [BuildingsService, SurroundingObjectsService]
})
export class BuildingsComponent implements OnInit {
  mainBuilding = [
    { name: '', description: '', x: 135.63, y: 33, width: 429.37, height: 354, fill: '#e8e8e8', stroke: '#d2d2d2' },
    { name: '', description: '', x: 4, y: 4, width: 131.63, height: 412, fill: '#b4d1cf', stroke: '#869694' }
  ];
  surroundingObjects: any;
  svg: any;

  constructor(private buildingsService: BuildingsService,
    private surroundingObjectsService: SurroundingObjectsService) { }

  ngOnInit(): void {
    this.createSvg();

    this.buildingsService.getBuildings()
      .subscribe(
        data => {
          this.applyMainBuildingData(data[0]);
          this.draw(this.mainBuilding, 'main-building');

          this.drawSurroundingObjects();
        });
  }

  private createSvg(): void {
    this.svg = d3.select('div#canvas')
      .append('svg')
      .attr('viewBox', `-300 -120 2000 606`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g');
  }

  private applyMainBuildingData(data: any) {
    this.mainBuilding[0].name = data.name;
    this.mainBuilding[1].name = data.name;
    this.mainBuilding[0].description = data.description;
    this.mainBuilding[1].description = data.description;
  }

  private draw(data: any[], className: string): void {
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

  private drawSurroundingObjects() {
    this.surroundingObjectsService.getSurroundingObjects()
      .subscribe(
        data => {
          this.surroundingObjects = data,
            this.draw(this.surroundingObjects, 'surrounding-objects');
        });
  }
}

