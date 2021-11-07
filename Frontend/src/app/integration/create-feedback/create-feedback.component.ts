import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CreateFeedbackService } from './create-feedback.service';

export class Pharmacy{
  constructor(
    public idPharmacy : string,
    public namePharmacy : string,
    public apiKeyPharmacy : string,
    public endpoint : string
  ) {
    
  }

}

export class Feedback{
  constructor(
    public idFeedback : string,
    public idPharmacy : string,
    public contentFeedback : string,
  ) {
    
  }

}

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css']
})
export class CreateFeedbackComponent implements OnInit {

  pharmacies: Pharmacy[] = [];
  selectedPharmacyId: string = '';
  contentFeedback: string = '';

  constructor(private httpClient: HttpClient, private feedbackService: CreateFeedbackService) { 
    
  }

  ngOnInit(): void {
      

    this.feedbackService.getPharmacies().subscribe((pharmacies: Pharmacy[]) => {
      this.pharmacies = pharmacies;
      console.log(this.pharmacies);    
      
  });
  }

  

  //event handler for the select element's change event
  selectChangeHandlerId (event: any) {
    this.selectedPharmacyId = event.target.value;
  }

  selectChangeHandlerContent (event: any) {
    this.contentFeedback = event.target.value;
  }

  end() : void {

    var feedback = {
      idFeedback: "test",
      idPharmacy: this.selectedPharmacyId,
      contextFeedback: this.contentFeedback};

      console.log(feedback);

  }

  

}
