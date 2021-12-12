import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MedicationSpecificationService } from '../medication-specification/medication-specification.service';
import { UrgentRequestService } from './urgent-request.service';

export class Medicine {
  constructor(
    public Id: number
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
  selector: 'app-urgent-request',
  templateUrl: './urgent-request.component.html',
  styleUrls: ['./urgent-request.component.css']
})
export class UrgentRequestComponent implements OnInit {
  medicine: string = '';
  dose: string = '';
  quantity: string = '';
  selectedPharmacyId: string = '';
  isAvailable: boolean = false;
  pharmacies: Pharmacy[] = [];
  disableFields: boolean = false;

  constructor(private httpClient: HttpClient, private medicationSpecificationService: MedicationSpecificationService, private urgentRequestService: UrgentRequestService) { }

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
    this.selectedPharmacyId = event.target.value;
    console.log(this.selectedPharmacyId);
  }

  checkIfAvailable(): void {

    var urgentRequest = {
      Name: this.medicine,
      DosageInMg: this.dose,
      Quantity: this.quantity,
    };

    if (urgentRequest.Name == "" || urgentRequest.DosageInMg == "" || urgentRequest.Quantity == "") {
      alert("Please fill all fields!")
    } else {
      this.pharmacies = [];
      this.medicationSpecificationService.checkIfAvailable(urgentRequest).subscribe(response => {
        if (response) {
          alert("Medicine is available in required quantity!")
          this.medicationSpecificationService.getPharmacyByID("1").subscribe(response => {
            console.log(response)
            this.pharmacies.push(response)
          })
          this.disableFields = true
        }
        else {
          alert("Medicine doesn't exist or not available in desired quantity!")
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
      quantity: this.quantity
    };

    if (this.selectedPharmacyId == "") {
      alert("Please select pharmacy!")
    } else {

      this.medicationSpecificationService.getPharmacyByID(this.selectedPharmacyId).subscribe((pharmacy: Pharmacy) => {
        this.medicationSpecificationService.findMedicineByNameAndDose(medicationSpecification.name, medicationSpecification.dosageinmg, pharmacy.apiKeyPharmacy, pharmacy.endpoint).subscribe((med: Medicine) => {

          console.log("Returned medicine:")
          console.log(med)

          console.log("Sent request:")
          var inventoryUpdate = {
            medicineId: med.Id,
            quantity: this.quantity
          };
          console.log(inventoryUpdate);

          this.urgentRequestService.updatePharmacyInventory(inventoryUpdate, inventoryUpdate.medicineId, pharmacy.apiKeyPharmacy, pharmacy.endpoint).subscribe(response => {
            if (response) {
              alert("Successfully updated pharmacy inventory!")
              this.urgentRequestService.UpdateHospitalInventory(med, +this.quantity, pharmacy.apiKeyPharmacy, pharmacy.endpoint).subscribe(response => {
                if (response) alert("Successfully updated hospital inventory!")
                else alert("Failed to update hospital inventory!")
              });
            }

            else alert("Failed to update pharmacy inventory!")
          });
        })
      })
    }
  }
}

