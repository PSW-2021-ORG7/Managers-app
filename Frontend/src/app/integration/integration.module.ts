import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntegrationRoutingModule } from './integration-routing.module';
import { IntegrationComponent } from './integration.component';
import { PharmacyRegistrationComponent } from './pharmacy-registration/pharmacy-registration.component';


@NgModule({
  declarations: [
    IntegrationComponent,
    PharmacyRegistrationComponent
   
  ],
  imports: [
    CommonModule,
    IntegrationRoutingModule
  ]
})
export class IntegrationModule { }
