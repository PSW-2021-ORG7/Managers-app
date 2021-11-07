import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntegrationComponent } from './integration.component';
import { PharmacyRegistrationComponent } from './pharmacy-registration/pharmacy-registration.component';

const routes: Routes = [
  { path: '', component: IntegrationComponent },
  { path : 'pharmacy-registration', component: PharmacyRegistrationComponent }
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntegrationRoutingModule { }
