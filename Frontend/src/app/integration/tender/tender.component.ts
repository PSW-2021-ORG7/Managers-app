import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.scss']
})
export class TenderComponent implements OnInit {
  medicine: string = '';
  dose: string = '';
  quantity: string = '';
  manufacturer: string = '';
  date: string = '';
  disableFields: boolean = false;
  
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

  selectChangeHandlerManufacturer(event: any) {
    this.manufacturer = event.target.value;
    console.log(this.manufacturer);
  }

  selectChangeHandlerDate(event: any) {
    this.date = event.target.value;
    console.log(this.quantity);
  }

  send(): void {
    var tender = {
      name: this.medicine,
      dosageimg: this.dose,
      quantity: this.quantity,
      manufacturer: this.manufacturer,
      date: this.date
    };
    if(this.medicine == "" || this.dose == "" || this.quantity == "" || this.manufacturer =="" || this.date ==""){
        alert("Please fill all fields!")
    }else {
        console.log(tender)
        alert("Successfully activated tender!")
        window.location.reload()
    }
  }


}
