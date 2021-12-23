import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFeedbackComponent } from './create-feedback/create-feedback.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { IntegrationComponent } from './integration.component';
import { MedicationSpecificationComponent } from './medication-specification/medication-specification.component';
import { PharmacyProfileComponent } from './pharmacy-profile/pharmacy-profile.component';
import { PharmacyRegistrationComponent } from './pharmacy-registration/pharmacy-registration.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { UrgentRequestComponent } from './urgent-request/urgent-request.component';

const routes: Routes = [
  { path: '', component: IntegrationComponent },
  { path : 'pharmacy-registration', component: PharmacyRegistrationComponent },
  { path : 'feedback', component: FeedbackComponent },
  { path : 'create-feedback', component: CreateFeedbackComponent },
  { path: 'urgent-request', component: UrgentRequestComponent },
  { path: 'medication-specification', component: MedicationSpecificationComponent },
  { path: 'prescriptions', component: PrescriptionsComponent},
  { path: 'pharmacy-profile', component: PharmacyProfileComponent},
  { path: 'pharmacy-profile', component: PharmacyProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntegrationRoutingModule { }
