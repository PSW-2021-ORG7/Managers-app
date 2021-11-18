import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntegrationRoutingModule } from './integration-routing.module';
import { IntegrationComponent } from './integration.component';
import { PharmacyRegistrationComponent } from './pharmacy-registration/pharmacy-registration.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CreateFeedbackComponent } from './create-feedback/create-feedback.component';
import { UrgentRequestComponent } from './urgent-request/urgent-request.component';
import { MedicationSpecificationComponent } from './medication-specification/medication-specification.component';


@NgModule({
  declarations: [
    IntegrationComponent,
    PharmacyRegistrationComponent,
    FeedbackComponent,
    CreateFeedbackComponent,
    UrgentRequestComponent,
    MedicationSpecificationComponent
   
  ],
  imports: [
    CommonModule,
    IntegrationRoutingModule
  ]
})
export class IntegrationModule { }
