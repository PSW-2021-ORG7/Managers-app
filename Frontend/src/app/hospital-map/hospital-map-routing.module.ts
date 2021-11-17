import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalMapComponent } from './hospital-map.component';
import { FloorPlanComponent } from './pages/floor-plan/floor-plan.component';

const routes: Routes = [
  { path: '', component: HospitalMapComponent },
  { path: 'floor-plan', component: FloorPlanComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalMapRoutingModule { }
