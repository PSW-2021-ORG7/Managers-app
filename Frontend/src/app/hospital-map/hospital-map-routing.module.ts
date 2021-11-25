import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalMapComponent } from './hospital-map.component';
import { FloorPlanComponent } from './pages/floor-plan/floor-plan.component';
import { RoomDetailsComponent } from './pages/room-details/room-details.component';
import { MoveEquipmentComponent } from './pages/move-equipment/move-equipment.component';
import { TransferTimeComponent } from './pages/move-equipment/transfer-time/transfer-time.component';

const routes: Routes = [
  { path: '', component: HospitalMapComponent },
  { path: 'floor-plan', component: FloorPlanComponent },
  { path: 'rooms/:id', component: RoomDetailsComponent},
  { path: 'move-equipment', component: MoveEquipmentComponent},
  { path: 'transfer-time', component: TransferTimeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalMapRoutingModule { }
