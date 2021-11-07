import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalMapRoutingModule } from './hospital-map-routing.module';
import { HospitalMapComponent } from './hospital-map.component';
import { D3Service } from './shared/d3.service';
import { FloorPlanComponent } from './floor-plan/floor-plan.component';
import { FormsModule } from '@angular/forms';
import { RoomInfoFormComponent } from './floor-plan/room-info-form/room-info-form.component';

@NgModule({
  declarations: [
    HospitalMapComponent,
    FloorPlanComponent,
    RoomInfoFormComponent
  ],
  imports: [
    CommonModule,
    HospitalMapRoutingModule,
    FormsModule
  ],
  providers: [D3Service]
})
export class HospitalMapModule { }
