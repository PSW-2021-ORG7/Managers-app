import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  barChartLabels: Label[] = ['Tender 1', 'Tender 2', 'Tender 3', 'Tender 4'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.55)',
    },
  ];
  barChartData: ChartDataSets[] = [
    { data: [500, 1000, 0, 1000], label: 'Price Available' },
    { data: [500, 1200, 800, 1100], label: 'Price Required' },
    { data: [0, 0, 800, 0], label: 'Price Available (Won Tender)' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
