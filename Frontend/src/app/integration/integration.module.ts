import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { NgChartsModule } from 'ng2-charts';

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
    ViewTendersComponent,
    BarChartComponent
  ],
  imports: [
    CommonModule,
    IntegrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgChartsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    DatePipe
  ]
})
export class IntegrationModule { }
