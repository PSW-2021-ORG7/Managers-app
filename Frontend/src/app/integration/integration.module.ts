import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntegrationRoutingModule } from './integration-routing.module';
import { IntegrationComponent } from './integration.component';
import { PharmacyRegistrationComponent } from './pharmacy-registration/pharmacy-registration.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CreateFeedbackComponent } from './create-feedback/create-feedback.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './http-interceptor';
import { UrgentRequestComponent } from './urgent-request/urgent-request.component';
import { MedicationSpecificationComponent } from './medication-specification/medication-specification.component';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
=======
>>>>>>> 7890b2d (feat: Added page for pharmacy profile)
import { PharmacyProfileComponent } from './pharmacy-profile/pharmacy-profile.component';

@NgModule({
  declarations: [
    IntegrationComponent,
    PharmacyRegistrationComponent,
    FeedbackComponent,
    CreateFeedbackComponent,
    UrgentRequestComponent,
    MedicationSpecificationComponent,
<<<<<<< HEAD
    PrescriptionsComponent
=======
>>>>>>> 7890b2d (feat: Added page for pharmacy profile)
    PharmacyProfileComponent
   
  ],
  imports: [
    CommonModule,
    IntegrationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ]
})
export class IntegrationModule { }
