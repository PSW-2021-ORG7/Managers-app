import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'hospital-map', loadChildren: () => import('./hospital-map/hospital-map.module').then(m => m.HospitalMapModule) }, 
  { path: 'integration', loadChildren: () => import('./integration/integration.module').then(m => m.IntegrationModule) },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
