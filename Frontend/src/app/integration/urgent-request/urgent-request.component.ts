import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UrgentRequestService } from './urgent-request.service';

export class Medicine {
  constructor(
    public MedicineId: string,
    public dose: string,
    public quantity: string,
    public selectedPharmacy: string
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

  constructor(private httpClient: HttpClient, private urgentRequestService: UrgentRequestService) { }

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


    this.urgentRequestService.checkIfAvilable(urgentRequest).subscribe(response => {
      if (response) {
        alert("Medicine is available in required quantity!")
        this.urgentRequestService.getPharmacyByID("P1").subscribe(response => {
          console.log(response)
          this.pharmacies.push(response)
        })
      }
      else {
        alert("Medicine doesn't exist or not available in desired quantity!")
      }

    })

  }

  send(): void {
    var urgentRequest = {
      medicine: this.medicine,
      dose: this.dose,
      quantity: this.quantity,
    };

    var medicationSpecification = {
      name: this.medicine,
      dosageinmg: this.dose,
      quantity: this.quantity
    };

    this.urgentRequestService.getPharmacyByID(this.selectedPharmacyId).subscribe((pharmacy: Pharmacy) => {
      pharmacy = pharmacy;
      this.urgentRequestService.findMedicineByNameAndDose(medicationSpecification.name, medicationSpecification.dosageinmg, pharmacy.apiKeyPharmacy, pharmacy.endpoint).subscribe((med: Medicine) => {

        console.log("Returned medicine:")
        console.log(med)
        console.log(med.MedicineId)

        console.log("Sent request:")
        var inventoryUpdate = {
          medicineId: med.MedicineId,
          quantity: this.quantity
        };
        console.log(inventoryUpdate);

        this.urgentRequestService.updatePharmacyInventory(inventoryUpdate, inventoryUpdate.medicineId, pharmacy.apiKeyPharmacy, pharmacy.endpoint).subscribe(response => {
          if (response) alert("Successfully updated pharmacy inventory!")
          else alert("Failed to update pharmacy inventory!")
        });

      })

    })

    this.urgentRequestService.checkIfAvilable(urgentRequest).subscribe(response => {
      if (response) {
        alert("Medicine is available!")
      }
      else {
        alert("Medicine doesn't exist!")
      }

    });
  }
}

