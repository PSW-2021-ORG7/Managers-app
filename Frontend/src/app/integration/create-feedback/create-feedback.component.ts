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

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css']
})
export class CreateFeedbackComponent implements OnInit {

  pharmacies: Pharmacy[] = [];
  constructor(private httpClient: HttpClient, private feedbackService: CreateFeedbackService) { 
    
  }


  ngOnInit(): void {
      

    this.feedbackService.getPharmacies().subscribe((pharmacies: Pharmacy[]) => {
      this.pharmacies = pharmacies;
      console.log(this.pharmacies);    
      
  });
  }

}
