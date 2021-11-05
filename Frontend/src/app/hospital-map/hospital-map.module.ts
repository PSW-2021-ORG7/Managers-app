import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalMapRoutingModule } from './hospital-map-routing.module';
import { HospitalMapComponent } from './hospital-map.component';


@NgModule({
  declarations: [
    HospitalMapComponent
  ],
  imports: [
    CommonModule,
    HospitalMapRoutingModule
  ]
})
export class HospitalMapModule { }
