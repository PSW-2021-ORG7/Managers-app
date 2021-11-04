import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingPlansComponent } from './building-plans/building-plans.component';
import { HospitalMapComponent } from './hospital-map.component';

const routes: Routes = [
  { path: '', component: HospitalMapComponent },
  { path: 'plan', component: BuildingPlansComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalMapRoutingModule { }
