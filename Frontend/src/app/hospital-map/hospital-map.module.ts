import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalMapRoutingModule } from './hospital-map-routing.module';
import { HospitalMapComponent } from './hospital-map.component';
import { D3Service } from './shared/d3.service';
import { FloorPlanComponent } from './floor-plan/floor-plan.component';
import { FormsModule } from '@angular/forms';
import { RoomInfoFormComponent } from './floor-plan/room-info-form/room-info-form.component';
import { RoomTypeToStringPipe } from './floor-plan/room-type-to-string.pipe';
import { RoomStatusToStringPipe } from './floor-plan/room-status-to-string.pipe';

@NgModule({
  declarations: [
    HospitalMapComponent,
    FloorPlanComponent,
    RoomInfoFormComponent,
    RoomTypeToStringPipe,
    RoomStatusToStringPipe
  ],
  imports: [
    CommonModule,
    HospitalMapRoutingModule,
    FormsModule
  ],
  providers: [D3Service]
})
export class HospitalMapModule { }
