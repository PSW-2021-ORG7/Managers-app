import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntegrationRoutingModule } from './integration-routing.module';
import { IntegrationComponent } from './integration.component';


@NgModule({
  declarations: [
    IntegrationComponent
  ],
  imports: [
    CommonModule,
    IntegrationRoutingModule
  ]
})
export class IntegrationModule { }
