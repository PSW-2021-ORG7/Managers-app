import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FloorPlanComponent } from './floor-plan/floor-plan.component';
import { HospitalMapComponent } from './hospital-map.component';

const routes: Routes = [
  { path: '', component: HospitalMapComponent },
  { path: 'floor-plan', component: FloorPlanComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalMapRoutingModule { }
