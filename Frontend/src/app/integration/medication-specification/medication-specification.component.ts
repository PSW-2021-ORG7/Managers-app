import { Component, OnInit } from '@angular/core';
import { MedicationSpecificationService } from './medication-specification.service';
import Swal from 'sweetalert2'


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

  constructor(private medicationSpecificationService: MedicationSpecificationService) { }

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
      Swal.fire({text: 'Please fill both fields!', icon: 'warning'})
    } else {
      this.pharmacies = [];
      this.medicationSpecificationService.checkIfAvailable(medicationSpecification).subscribe(response => {
        if (response) {
          Swal.fire({ text: 'Medicine is available!', icon: 'success' })
          this.medicationSpecificationService.getPharmacyByID("1").subscribe(response => {
            this.pharmacies.push(response)
          })
          this.disableFields = true
        }
      }, error => {
        Swal.fire({
          title: 'Error trying to retreive medicine',
          text: 'Server might be down or make sure you entered valid data',
          icon: 'error'
        })
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

    if (this.selectedPharmacyId == '') {
      Swal.fire({text: 'Please select pharmacy!', icon: 'warning'})
    } else {
      this.medicationSpecificationService.getPharmacyByID(this.selectedPharmacyId).subscribe((pharmacy: Pharmacy) => {

        this.medicationSpecificationService.requestSpecification(medicationSpecification.name, medicationSpecification.dosageinmg, pharmacy.apiKeyPharmacy, pharmacy.endpoint).subscribe(response => {

          console.log("Returned file name: " + response) 
            this.disableFields = false;
            this.pharmacies = [];
          
          this.medicationSpecificationService.downloadSpecification(response).subscribe(downloadResponse => {
            if (downloadResponse) {
              Swal.fire({text: 'Successfully downloaded specification!', icon: 'success'}).then(function(){window.location.reload()})             
            }
            else {
              Swal.fire({text: 'Failed to download specification!', icon: 'error'})
            }
          })
        }, error => {Swal.fire({title: 'Unable to upload specification', text: 'Unable to connect to SFTP server', icon: 'error'})})
      })
    }
  }
}
