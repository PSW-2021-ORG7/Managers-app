import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'hospital-map', loadChildren: () => import('./hospital-map/hospital-map.module').then(m => m.HospitalMapModule) }, 
{ path: 'integration', loadChildren: () => import('./integration/integration.module').then(m => m.IntegrationModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
