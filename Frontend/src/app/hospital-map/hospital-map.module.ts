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
import { RoomRenovationComponent } from './pages/room-renovation/room-renovation.component';
import { RoomScheduleComponent } from './pages/room-schedule/room-schedule.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { RoomScheduleCalendarComponent } from './pages/room-schedule/room-schedule-calendar/room-schedule-calendar.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { OptionalDialogComponent } from './shared/components/optional-dialog/optional-dialog.component';
import { InfoDialogComponent } from './shared/components/info-dialog/info-dialog.component';
import { AvailableTimeSlotsComponent } from './shared/components/available-time-slots/available-time-slots.component';
import { ManageDoctorComponent } from './pages/manage-doctor/manage-doctor.component';
import { DoctorScheduleCalendarComponent } from './pages/manage-doctor/doctor-schedule-calendar/doctor-schedule-calendar.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

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
    RoomRenovationComponent,
    RoomScheduleComponent,
    RoomScheduleCalendarComponent,
    OptionalDialogComponent,
    InfoDialogComponent,    
    RoomRenovationComponent,
    AvailableTimeSlotsComponent,
    ManageDoctorComponent,
    DoctorScheduleCalendarComponent
  ],
  imports: [
    CommonModule,
    HospitalMapRoutingModule,
    FormsModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    FullCalendarModule,
    NgxSpinnerModule
  ],
  providers: [D3Service]
})
export class HospitalMapModule { }
