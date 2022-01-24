import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MedicationSpecificationService } from '../medication-specification/medication-specification.service';
import { UrgentRequestService } from './urgent-request.service';
import Swal from 'sweetalert2'

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
      Swal.fire({title: 'Please fill all fields', icon: 'warning'})
    } else {
      this.pharmacies = [];
      this.medicationSpecificationService.checkIfAvailable(urgentRequest).subscribe(response => {
        if (response) {
          Swal.fire({title: 'Medicine is available in required quantity', icon: 'success'})
          this.medicationSpecificationService.getPharmacyByID("1").subscribe(response => {
            console.log(response)
            this.pharmacies.push(response)
          })
          this.disableFields = true
        }
        else {
          Swal.fire({title: 'Medicine does not exist or is not available in desired quantity', icon: 'warning'})
        }

      }, error => {Swal.fire({title: 'Error connecting to pharmacy', icon: 'error'})})
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
      Swal.fire({title: 'Please select pharmacy', icon: 'warning'})
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
              Swal.fire({title:'Successfully updated pharmacy inventory', icon:'success'})
              this.urgentRequestService.UpdateHospitalInventory(med, +this.quantity, pharmacy.apiKeyPharmacy, pharmacy.endpoint).subscribe(response => {
                if (response) Swal.fire({title:'Successfully updated hospital inventory', icon:'success'}).then(function(){window.location.reload()}) 
                else  Swal.fire({title: 'Failed to update hospital inventory', icon: 'error'})
              }, error => { Swal.fire({title: 'Failed to connect to hospital server', icon: 'error'})});
            }

            else  Swal.fire({title: 'Failed to update pharmacy inventory', icon: 'error'})
          }, error => { Swal.fire({title: 'Failed to connect to pharmacy server', icon: 'error'})});
        })
      })
    }
  }
}

