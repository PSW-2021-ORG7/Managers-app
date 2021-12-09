import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { HospitalMapRoutingModule } from './hospital-map-routing.module';
import { HospitalMapComponent } from './hospital-map.component';
import { D3Service } from './shared/services/d3.service';
import { FloorPlanComponent } from './pages/floor-plan/floor-plan.component';
import { FormsModule } from '@angular/forms';
import { RoomInfoFormComponent } from './pages/room-details/room-info-form/room-info-form.component';
import { RoomTypeToStringPipe } from './shared/pipes/room-type-to-string.pipe';
import { RoomStatusToStringPipe } from './shared/pipes/room-status-to-string.pipe';
import { SideBarComponent } from './pages/floor-plan/side-bar/side-bar.component';
import { PrimaryButtonComponent } from './shared/components/primary-button/primary-button.component';
import { ScrollBoxComponent } from './pages/floor-plan/side-bar/scroll-box/scroll-box.component';
import { RoomCardComponent } from './shared/components/room-card/room-card.component';
import { RoomDetailsComponent } from './pages/room-details/room-details.component';
import { EquipmentCardComponent } from './shared/components/equipment-card/equipment-card.component';
import { MoveEquipmentComponent } from './pages/move-equipment/move-equipment.component';
import { SelectedEquipmentComponent } from './pages/move-equipment/equipment-overview/equipment-overview.component';
import { DestinationRoomOverviewComponent } from './pages/move-equipment/destination-room-overview/destination-room-overview.component';
import { TransferTimeComponent } from './pages/move-equipment/transfer-time/transfer-time.component';
import { RoomRenovationComponent } from './pages/room-renovation/room-renovation.component';

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
    EquipmentCardComponent,
    MoveEquipmentComponent,
    SelectedEquipmentComponent,
    DestinationRoomOverviewComponent,
    TransferTimeComponent,
    RoomRenovationComponent
    
  ],
  imports: [
    CommonModule,
    HospitalMapRoutingModule,
    FormsModule,
    NgbDatepickerModule,
    NgbDropdownModule
  ],
  providers: [D3Service]
})
export class HospitalMapModule { }
