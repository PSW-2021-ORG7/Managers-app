import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFeedbackComponent } from './create-feedback/create-feedback.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { IntegrationComponent } from './integration.component';
import { PharmacyRegistrationComponent } from './pharmacy-registration/pharmacy-registration.component';

const routes: Routes = [
  { path: '', component: IntegrationComponent },
  { path : 'pharmacy-registration', component: PharmacyRegistrationComponent },
  { path : 'feedback', component: FeedbackComponent },
  { path : 'create-feedback', component: CreateFeedbackComponent }
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntegrationRoutingModule { }
