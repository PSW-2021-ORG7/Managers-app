import { Component, HostListener, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-hospital-map',
  templateUrl: './hospital-map.component.html',
  styleUrls: ['./hospital-map.component.css']
})
export class HospitalMapComponent implements OnInit {

  constructor() { 
    
  }
  
  ngOnInit(): void {
    this.svgContainer = document.getElementById("map")!;
    this.svgImage = document.getElementById("map-background")!;
    this.drawTwoRects();
  }
  
  svgContainer: any;
  svgImage: any;
  viewBox = {x: 0, y: 0, w: document.documentElement.clientWidth, h: document.documentElement.clientHeight};
  svgSize = {w: 1920, h: 1080};
  isPanning = false;
  startPoint = {x: 0, y: 0};
  endPoint = {x: 0, y: 0};;
  scale = 1;

  private drawTwoRects(): void {
    const mySvg = d3.select('#map-background')
    
    mySvg.
    selectAll('.random')
    .data([
      { "x": 300, "y": 260, "width": 400, "height": 400, "fill": "#e8e8e8", "stroke": "#d2d2d2" },
      { "x": 1200, "y": 260, "width": 300, "height": 250, "fill": "#e8e8e8", "stroke": "#d2d2d2" }
    ])
    .enter()
    .append('rect')
    .attr('x', function (d: { x: any; }) { return d.x; })
    .attr('y', function (d: { y: any; }) { return d.y; })
    .attr('width', function (d: { width: any; }) { return d.width; })
    .attr('height', function (d: { height: any; }) { return d.height; })
    .attr('fill', function (d: { fill: any; }) { return d.fill; })
    .attr('stroke', function (d: { stroke: any; }) { return d.stroke; })
    .attr('stroke-width', 8)
    .attr('class', 'random')
    .style('cursor' , 'pointer')
    .on("mouseover", function (d) {
     d3.select(this).style("fill", "blue");
   }).on("mouseout", function (d) {
    d3.select(this).style("fill", "#e8e8e8");
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
    this.viewBox = {x: Math.max(0, this.viewBox.x - dx), y: Math.max(0, this.viewBox.y - dy), w: Math.min(this.viewBox.w + dw, 1920), h: Math.min(this.viewBox.h + dh, 1080)};
    this.scale = this.svgSize.w / this.viewBox.w;
    this.svgImage.setAttribute('viewBox', `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.w} ${this.viewBox.h}`);
  }

  public mouseDownFn(e: any): void{
    this.isPanning = true;
    this.startPoint = {x: e.x, y: e.y};   
  }

  public mouseMoveFn(e: any): void{
    if (this.isPanning){
      this.endPoint = {x:e.x,y:e.y};
      var dx = (this.startPoint.x - this.endPoint.x)/this.scale;
      var dy = (this.startPoint.y - this.endPoint.y)/this.scale;
      var movedViewBox = {x: this.viewBox.x + dx, y: this.viewBox.y + dy, w: this.viewBox.w, h:this.viewBox.h};
      this.svgImage.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
    }
  }

  public mouseUpFn(e: any): void{
    if (this.isPanning){ 
      this.endPoint = {x:e.x, y:e.y};
      var dx = (this.startPoint.x - this.endPoint.x) / this.scale;
      var dy = (this.startPoint.y - this.endPoint.y) / this.scale;
      if(this.viewBox.x + dx + this.viewBox.w > 1920 || this.viewBox.x + dx < 0)
        dx = 0
      if(this.viewBox.y + dy + this.viewBox.h > 1080 || this.viewBox.y + dy < 0)
        dy = 0
      this.viewBox = {x:this.viewBox.x + dx, y: this.viewBox.y + dy, w: this.viewBox.w, h: this.viewBox.h};
      this.svgImage.setAttribute('viewBox', `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.w} ${this.viewBox.h}`);
      this.isPanning = false;
    }
  }

  public mouseLeaveFn(e: any): void{
    this.isPanning = false;
  }

}
