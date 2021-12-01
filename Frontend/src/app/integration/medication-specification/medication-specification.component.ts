import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MedicationSpecificationService } from './medication-specification.service';


export class MedicationSpecification {
  constructor(
    public name: string,
    public dosageinmg: string,
    public quantity: number
  ) { }
}

export class Pharmacy {
  constructor(
    public idPharmacy: string,
    public namePharmacy: string,
    public apiKeyPharmacy: string,
    public endpoint: string
  ) { }
}

@Component({
  selector: 'app-medication-specification',
  templateUrl: './medication-specification.component.html',
  styleUrls: ['./medication-specification.component.scss']
})

export class MedicationSpecificationComponent implements OnInit {
  medicine: string = '';
  dose: string = '';
  selectedPharmacyId: string = '';
  disableFields: boolean = false;
  pharmacies: Pharmacy[] = [];

  constructor(private httpClient: HttpClient, private medicationSpecificationService: MedicationSpecificationService) { }

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
    this.selectedPharmacyId = event.target.value;
    console.log(this.selectedPharmacyId);
  }

  checkIfAvailable(): void {

    var medicationSpecification = {
      name: this.medicine,
      dosageinmg: this.dose,
      quantity: 1
    };

    if (medicationSpecification.name == "" || medicationSpecification.dosageinmg == "") {
      alert("Please fill both fields!")
    } else {
      this.pharmacies = [];
      this.medicationSpecificationService.checkIfAvailable(medicationSpecification).subscribe(response => {
        if (response) {
          alert("Medicine is available!")
          this.medicationSpecificationService.getPharmacyByID("P1").subscribe(response =>{
            console.log(response)
            this.pharmacies.push(response)
          })
          this.disableFields = true
        }
        else {
          alert("Medicine doesn't exist!")
        }

      })
    }
  }

  cancel(): void { 
    this.pharmacies = [];
    this.disableFields = false;   
  }

  send(): void {
    var medicationSpecification = {
      name: this.medicine,
      dosageinmg: this.dose,
      quantity: 1
    };

    if(this.selectedPharmacyId == ''){
      alert("Please select pharmacy!")
    }else{    
      this.medicationSpecificationService.getPharmacyByID(this.selectedPharmacyId).subscribe((pharmacy: Pharmacy) => {

        this.medicationSpecificationService.requestSpecification(medicationSpecification.name, medicationSpecification.dosageinmg, pharmacy.apiKeyPharmacy, pharmacy.endpoint).subscribe(response => {
          
          console.log("Returned file name: " + response)

          if(response == ""){
            alert("ERROR!")
          } else {
            this.disableFields = false;
            this.pharmacies = [];
          }
      
          this.medicationSpecificationService.downloadSpecification(response).subscribe(downloadResponse => {
            if(downloadResponse){
              alert("Successfully returned medicine!")
              window.location.reload()
            }
            else{
              alert("Failed to download specification!")
            }
          })
        })      
      })
    } 
  }
}
