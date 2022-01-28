import { Component, OnInit } from '@angular/core';
import { CreateFeedbackService } from './create-feedback.service';
import Swal from 'sweetalert2'

export class Pharmacy {
  constructor(
    public idPharmacy: number,
    public namePharmacy: string,
    public city: string,
    public address: string,
    public apiKeyPharmacy: string,
    public endpoint: string,
  ) { }
}

export class Feedback {
  constructor(
    public idHospital: string,
    public contentFeedback: string,
  ) {
  }

}

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.scss']
})
export class CreateFeedbackComponent implements OnInit {

  pharmacies: Pharmacy[] = [];
  selectedPharmacyId: string = ''
  contentFeedback: string = ''
  http: any;
  feedback: Feedback | undefined
  apiKey: string = ""
  endpoint: string = ""

  constructor(private feedbackService: CreateFeedbackService) {

  }

  ngOnInit(): void {

    this.feedbackService.getPharmacies().subscribe((pharmacies: Pharmacy[]) => {
      this.pharmacies = pharmacies;
      console.log(this.pharmacies);

    });
  }

  selectChangeHandlerId(event: any) {
    this.selectedPharmacyId = event.target.value;
    console.log(this.selectedPharmacyId)
  }

  selectChangeHandlerContent(event: any) {
    this.contentFeedback = event.target.value;
    console.log(this.contentFeedback);

  }

  send(): void {

    if (this.contentFeedback == "") Swal.fire({ title: 'Please write some feedback', icon: 'warning' })
    else {

      this.pharmacies.forEach((pharmacy) => {
        if (pharmacy.idPharmacy == +this.selectedPharmacyId) {
          this.apiKey = pharmacy.apiKeyPharmacy
          this.endpoint = pharmacy.endpoint
        }

      })

      var feedback = {
        IdHospital: "1",
        ContentFeedback: this.contentFeedback
      };

      this.feedbackService.addFeedback(feedback, this.apiKey, this.endpoint).subscribe(response => {
        if (response) Swal.fire({
          title: 'Successfully sent feedback!',
          icon: 'success'
        }).then(function(){window.location.reload()})
        
      }, error => {
        Swal.fire({
          title: "There was an error while trying to send feedback",
          text: "Server might be down",
          icon: 'error'
        }).then(function () { window.location.reload() })

      })

    }
  }
}


