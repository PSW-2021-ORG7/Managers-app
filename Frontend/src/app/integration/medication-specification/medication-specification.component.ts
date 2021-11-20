import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MedicationSpecificationService } from './medication-specification.service';


export class MedicationSpecification {
  constructor(
    public name: string,
    public dosageinmg: string,
    public quantity: number
    //public selectedPharmacy: string
  ){

  }

}

export class Pharmacy {
  constructor(
    public idPharmacy: string,
    public namePharmacy: string,
    public apiKeyPharmacy: string,
    public endpoint: string
  ) {

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
  selectedPharmacyId: string = '';

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

  send(): void {
    var medicationSpecification = {
      name: this.medicine,
      dosageinmg: this.dose,
      quantity: 1
      //selectedPharmacy: this.selectedPharmacy
    };
    console.log(medicationSpecification);
    alert("WAIT")
    
    this.medicationSpecificationService.checkIfAvailable(medicationSpecification).subscribe(response => {
      if(response){
        alert("Medicine is available!")

        this.medicationSpecificationService.getPharmacyByID(this.selectedPharmacyId).subscribe((pharmacy: Pharmacy) => {
          pharmacy = pharmacy;
          this.medicationSpecificationService.findMedicineByNameAndDose(medicationSpecification.name, medicationSpecification.dosageinmg,pharmacy.apiKeyPharmacy, pharmacy.endpoint).subscribe((medicine: any) => {
            
            console.log(medicine);
            alert("Successfully returned medicine!")

                       
          });

         
        });

      }
      else{
        alert("Medicine doesn't exist!")
      }
      
    })
  }

}
