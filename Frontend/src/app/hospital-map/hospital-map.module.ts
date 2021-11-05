import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalMapRoutingModule } from './hospital-map-routing.module';
import { HospitalMapComponent } from './hospital-map.component';
import { D3Service } from './shared/d3.service';


@NgModule({
  declarations: [
    HospitalMapComponent
  ],
  imports: [
    CommonModule,
    HospitalMapRoutingModule
  ],
  providers: [D3Service]
})
export class HospitalMapModule { }
