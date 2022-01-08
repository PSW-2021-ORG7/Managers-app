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
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { PharmacyProfileComponent } from './pharmacy-profile/pharmacy-profile.component';
import { TenderComponent } from './tender/tender.component';
import { ViewTendersComponent } from './view-tenders/view-tenders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    IntegrationComponent,
    PharmacyRegistrationComponent,
    FeedbackComponent,
    CreateFeedbackComponent,
    UrgentRequestComponent,
    MedicationSpecificationComponent,
    PrescriptionsComponent,
    PharmacyProfileComponent,
    TenderComponent,
    ViewTendersComponent
   
  ],
  imports: [
    CommonModule,
    IntegrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ]
})
export class IntegrationModule { }
