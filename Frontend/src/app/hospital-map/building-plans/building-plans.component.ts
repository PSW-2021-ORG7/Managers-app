import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-building-plans',
  templateUrl: './building-plans.component.html',
  styleUrls: ['./building-plans.component.css']
})
export class BuildingPlansComponent implements OnInit {
  building:any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => this.building = params.building);
  }

}
