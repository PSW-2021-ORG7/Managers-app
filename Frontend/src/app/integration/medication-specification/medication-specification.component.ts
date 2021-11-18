import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


export class MedicationSpecification {
  constructor(
    public medicine: string,
    public dose: string,
    public selectedPharmacy: string
  ){

  }

}

@Component({
  selector: 'app-medication-specification',
  templateUrl: './medication-specification.component.html',
  styleUrls: ['./medication-specification.component.scss']
})
export class MedicationSpecificationComponent implements OnInit {
  medicine: string = '';
  dose: string = '';
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

  selectChangeHandlerSelectedPharmacy(event: any) {
    this.selectedPharmacy = event.target.value;
    console.log(this.selectedPharmacy);
  }

  send(): void {
    var medicationSpecification = {
      medicine: this.medicine,
      dose: this.dose,
      selectedPharmacy: this.selectedPharmacy
    };
    console.log(medicationSpecification);
    alert("success");
  }

}
