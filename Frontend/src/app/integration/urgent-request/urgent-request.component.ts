import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export class UrgentRequest {
  constructor(
    public medicine: string,
    public dose: string,
    public quantity: string,
    public selectedPharmacy: string
  ){

  }
}

@Component({
  selector: 'app-urgent-request',
  templateUrl: './urgent-request.component.html',
  styleUrls: ['./urgent-request.component.css']
})
export class UrgentRequestComponent implements OnInit {
  medicine: string = '';
  dose: string = '';
  quantity: string = '';
  selectedPharmacy: string = '';
  
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  selectChangeHandlerMedicine(event: any) {
    this.medicine = event.target.value;
    console.log(this.medicine);
  }

  selectChangeHandlerDose(event: any) {
    this.dose = event.target.value;
    console.log(this.dose);
  }


  selectChangeHandlerQuantity(event: any) {
    this.quantity = event.target.value;
    console.log(this.quantity);
  }

  selectChangeHandlerSelectedPharmacy(event: any) {
    this.selectedPharmacy = event.target.value;
    console.log(this.selectedPharmacy);
  }
  

  send(): void {
    var urgentRequest = {
      medicine: this.medicine,
      dose: this.dose,
      quantity: this.quantity,
      selectedPharmacy: this.selectedPharmacy
    };
    console.log(urgentRequest);
    alert("success");
      quantity: this.quantity
    };
  }

