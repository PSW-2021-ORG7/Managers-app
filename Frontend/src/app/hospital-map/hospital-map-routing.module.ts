import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalMapComponent } from './hospital-map.component';
import { FloorPlanComponent } from './pages/floor-plan/floor-plan.component';
import { RoomDetailsComponent } from './pages/room-details/room-details.component';
import { MoveEquipmentComponent } from './pages/move-equipment/move-equipment.component';
import { RoomRenovationComponent } from './pages/room-renovation/room-renovation.component';
import { RoomScheduleComponent } from './pages/room-schedule/room-schedule.component';
import { ManageDoctorComponent } from './pages/manage-doctor/manage-doctor.component';
import { ManageShiftsComponent } from './pages/manage-shifts/manage-shifts.component';

const routes: Routes = [
  { path: '', component: HospitalMapComponent },
  { path: 'floor-plan', component: FloorPlanComponent },
  { path: 'rooms/:id', component: RoomDetailsComponent},
  { path: 'move-equipment', component: MoveEquipmentComponent},
  { path: 'room-renovation/:id', component: RoomRenovationComponent},
  { path: 'room-schedule/:id', component: RoomScheduleComponent},
  { path: 'manage-doctor/:id', component: ManageDoctorComponent},
  { path: 'manage-shifts', component: ManageShiftsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalMapRoutingModule { }
