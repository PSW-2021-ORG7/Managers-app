import { Injectable } from '@angular/core';
import * as d3 from 'd3-selection';

@Injectable({
  providedIn: 'root'
})
export class D3Service {

  constructor() { }

  createSvg(viewBox:string): any {
    let svg = d3.select('div#canvas')
      .append('svg')
      .attr('viewBox', viewBox)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g');

    return svg;
  }

  drawRectangles(svg:any, data: any[], className: string): void {
    svg.selectAll('.' + className)
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

  drawPolygon(svg: any, data: any, idName: string) {
    svg.append('polygon')
      .attr('points', data.points)
      .attr('id', idName)
      .style('fill', 'transparent');
  }

  
  addText(svg:any, text: string, coords: {x: number, y: number}) {
    svg.append('text')
      .attr('x', coords.x)
      .attr('y', coords.y)
      .text(text)
      .style('fill', '#214975')
      .attr('font-size', '1.563rem');
  }

  selectById(id: string) : any {
    let object = d3.selectAll('#' + id);
    return object;
  }

}

