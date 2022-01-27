import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FeedbackService } from './feedback.service';
import Swal from 'sweetalert2'

export class Pharmacy {
  constructor(
    public idPharmacy: number,
    public namePharmacy: string,
    public address: string,
    public city: string,
    public apiKeyPharmacy: string,
    public endpoint: string
  ) { }
}

export class Feedback {
  constructor(
    public idFeedback: string,
    public idPharmacy: string,
    public contentFeedback: string,
  ) {
  }

}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  pharmacies: Pharmacy[] = []
  feedback: Feedback[] = []
  selectedPharmacyId: string = ''
  pharmacyResponseInfo: string = ''

  constructor(private httpClient: HttpClient, private feedbackService: FeedbackService) {

  }

  ngOnInit(): void {

    this.feedbackService.getPharmacies().subscribe((pharmacies: Pharmacy[]) => {
      this.pharmacies = pharmacies;
      console.log(this.pharmacies);

    });

  }

  selectChangeHandlerId(event: any) {
    this.selectedPharmacyId = event.target.value;
  }

  viewResponse(): void {

    this.feedbackService.getResponsesByPharmacy(this.selectedPharmacyId).subscribe((feedback: Feedback[]) => {
      this.feedback = feedback;    
    }, error => {Swal.fire({title: 'No response found', text: 'There is no feedback available from pharmacies'})})

  }

}
