import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalMapRoutingModule } from './hospital-map-routing.module';
import { HospitalMapComponent } from './hospital-map.component';
import { D3Service } from './shared/services/d3.service';
import { FloorPlanComponent } from './pages/floor-plan/floor-plan.component';
import { FormsModule } from '@angular/forms';
import { RoomInfoFormComponent } from './components/room-info-form/room-info-form.component';
import { RoomTypeToStringPipe } from './shared/pipes/room-type-to-string.pipe';
import { RoomStatusToStringPipe } from './shared/pipes/room-status-to-string.pipe';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { PrimaryButtonComponent } from './shared/components/primary-button/primary-button.component';
import { ScrollBoxComponent } from './components/side-bar/scroll-box/scroll-box.component';
import { RoomCardComponent } from './shared/components/room-card/room-card.component';
import { RoomDetailsComponent } from './pages/room-details/room-details.component';
import { EquipmentCardComponent } from './shared/components/equipment-card/equipment-card.component';

@NgModule({
  declarations: [
    HospitalMapComponent,
    FloorPlanComponent,
    RoomInfoFormComponent,
    RoomTypeToStringPipe,
    RoomStatusToStringPipe,
    SideBarComponent,
    PrimaryButtonComponent,
    ScrollBoxComponent,
    RoomCardComponent,
    RoomDetailsComponent,
    EquipmentCardComponent
  ],
  imports: [
    CommonModule,
    HospitalMapRoutingModule,
    FormsModule
  ],
  providers: [D3Service]
})
export class HospitalMapModule { }
