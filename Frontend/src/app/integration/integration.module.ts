import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntegrationRoutingModule } from './integration-routing.module';
import { IntegrationComponent } from './integration.component';
import { PharmacyRegistrationComponent } from './pharmacy-registration/pharmacy-registration.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CreateFeedbackComponent } from './create-feedback/create-feedback.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './http-interceptor';


@NgModule({
  declarations: [
    IntegrationComponent,
    PharmacyRegistrationComponent,
    FeedbackComponent,
    CreateFeedbackComponent
   
  ],
  imports: [
    CommonModule,
    IntegrationRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ]
})
export class IntegrationModule { }
