import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FeedbackService } from './feedback.service';

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
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  pharmacies: Pharmacy[] = [];
  constructor(private httpClient: HttpClient, private feedbackService: FeedbackService) { 
    
  }

  ngOnInit(): void {
    
    this.feedbackService.getPharmacies().subscribe((pharmacies: Pharmacy[]) => {
      this.pharmacies = pharmacies;
      console.log(this.pharmacies);    
      
  });
    
  }

}
