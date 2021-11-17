import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalMapRoutingModule } from './hospital-map-routing.module';
import { HospitalMapComponent } from './hospital-map.component';
import { D3Service } from './shared/services/d3.service';
import { FloorPlanComponent } from './pages/floor-plan/floor-plan.component';
import { FormsModule } from '@angular/forms';
import { RoomInfoFormComponent } from './components/room-info/room-info.component';
import { RoomTypeToStringPipe } from './shared/pipes/room-type-to-string.pipe';
import { RoomStatusToStringPipe } from './shared/pipes/room-status-to-string.pipe';

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
