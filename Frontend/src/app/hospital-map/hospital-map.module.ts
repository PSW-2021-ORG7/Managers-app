import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalMapRoutingModule } from './hospital-map-routing.module';
import { HospitalMapComponent } from './hospital-map.component';
import { BuildingsComponent } from './buildings/buildings.component';


@NgModule({
  declarations: [
    HospitalMapComponent,
    BuildingsComponent
  ],
  imports: [
    CommonModule,
    HospitalMapRoutingModule
  ]
})
export class HospitalMapModule { }
