import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CreateFeedbackService } from './create-feedback.service';

export class Pharmacy {
  constructor(
    public idPharmacy: string,
    public namePharmacy: string,
    public apiKeyPharmacy: string,
    public endpoint: string
  ) {

  }

}

export class Feedback {
  constructor(
    public idFeedback: string,
    public idHospital: string,
    public contentFeedback: string,
  ) {
  }

}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css']
})
export class CreateFeedbackComponent implements OnInit {

  pharmacies: Pharmacy[] = [];
  selectedPharmacyId: string = '';
  contentFeedback: string = '';
  http: any;
  feedback: Feedback | undefined

  constructor(private httpClient: HttpClient, private feedbackService: CreateFeedbackService) {

  }

  ngOnInit(): void {


    this.feedbackService.getPharmacies().subscribe((pharmacies: Pharmacy[]) => {
      this.pharmacies = pharmacies;
      console.log(this.pharmacies);

    });
  }



  //event handler for the select element's change event
  selectChangeHandlerId(event: any) {
    this.selectedPharmacyId = event.target.value;
  }

  selectChangeHandlerContent(event: any) {
    this.contentFeedback = event.target.value;
    console.log(this.contentFeedback);

  }

  send(): void {

    this.feedback = {
      idFeedback: "testWorks",
      idHospital: this.selectedPharmacyId,
      contentFeedback: this.contentFeedback
    };

    console.log(this.feedback);
    this.addFeedback(this.feedback)

  }

  addFeedback(feedback: Feedback) {

    console.log(feedback)
    return this.httpClient.post('http://localhost:64677/api/feedback', feedback, httpOptions); // DOES NOT WORK

  }


}


