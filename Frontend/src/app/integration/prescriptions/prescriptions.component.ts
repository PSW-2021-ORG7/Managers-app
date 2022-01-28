import { Component, OnInit } from '@angular/core';
import { MedicationSpecificationService } from '../medication-specification/medication-specification.service';
import { PrescriptionService } from './prescriptions.service';
import Swal from 'sweetalert2'

export class Prescription {
  constructor(
    public idPrescription: number,
    public patient: string,
    public patientJMBG: string,
    public doctor: string,
    public medicineId: number,
    public durationInDays: number,
    public timesPerDay: number,
    public description: string,
  ) { }
}

export class Pharmacy {
  constructor(
    public idPharmacy: number,
    public namePharmacy: string,
    public apiKeyPharmacy: string,
    public endpoint: string,
    public city: string,
    public address: string
  ) { }
}

export class Medicine {
  constructor(
    public name: string,
    public dosageInMilligrams: number
  ) { }
}

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss']
})
export class PrescriptionsComponent implements OnInit {

  prescriptions: Prescription[] = []
  pharmacies: Pharmacy[] = []
  selectedPrescriptionId: string = ""
  selectedPharmacyId: string = ""
  disableFields: boolean = true
  disableSend: boolean = true

  idPrescription: number = 0
  medicineId: number = 0
  patient: string = "... patient name ..."
  patientJMBG: string = "... jmbg ..."
  doctor: string = "Doctor"
  medicine: string = "Medicine 0" //Medicine name & dose
  medicineObj: Medicine = { name: "", dosageInMilligrams: 0 }
  durationInDays: number = 0
  timesPerDay: number = 0
  description: string = "Description"
  showPrescriptionData: boolean = true

  constructor(private prescriptionService: PrescriptionService, private medicationspec: MedicationSpecificationService) { }

  ngOnInit(): void {

    this.prescriptionService.getPrescriptions().subscribe((prescrptions: Prescription[]) => {
      this.prescriptions = prescrptions
   
    });
    

  }

  selectChangeHandlerId(event: any) {
    this.selectedPrescriptionId = event.target.value;

  }

  selectChangeHandlerSelectedPharmacy(event: any) {
    this.selectedPharmacyId = event.target.value;
    this.disableSend = false
    console.log(this.selectedPharmacyId);
  }

  viewPrescription(): void {

    this.showPrescriptionData = true
    this.disableFields = false
    this.prescriptionService.getPrescriptionyByID(this.selectedPrescriptionId).subscribe((prescription: Prescription) => {
      this.medicineId = prescription.medicineId
      this.patient = prescription.patient
      this.patientJMBG = prescription.patientJMBG
      this.doctor = prescription.doctor
      this.durationInDays = prescription.durationInDays
      this.timesPerDay = prescription.timesPerDay
      this.description = prescription.description

      this.prescriptionService.getMedicineById(this.medicineId).subscribe((medicine: Medicine) => {
        console.log(medicine)
        this.medicineObj = medicine
        this.medicine = medicine.name + " " + medicine.dosageInMilligrams
      });

    });

  }

  checkIfAvailable(): void {

    var medicationSpecification = {
      name: this.medicineObj.name,
      dosageinmg: this.medicineObj.dosageInMilligrams,
      quantity: 1
    };

    this.medicationspec.checkIfAvailable(medicationSpecification).subscribe(response => {
      if (response) {

        Swal.fire({ text: 'Medicine is available!', icon: 'success' })
        this.medicationspec.getPharmacyByID("1").subscribe(response => {
          this.pharmacies.push(response)
        });
      }
    }, error => {
      Swal.fire({
        title: 'Medicine is not available in chosen pharmacy!',
        icon: 'warning'
      })
    });

  }

  sendSFTP(): void {

    var prescription = {
      id: this.selectedPrescriptionId,
      patient: this.patient,
      patientJMBG: this.patientJMBG,
      doctor: this.doctor,
      medicineId: this.medicineId,
      durationInDays: this.durationInDays,
      timesPerDay: this.timesPerDay,
      description: this.description,
    };

    this.medicationspec.getPharmacyByID(this.selectedPharmacyId).subscribe((pharmacy: Pharmacy) => {

      this.prescriptionService.sendPrescriptionSFTP(prescription, "ABC").subscribe((filename: string) => {
        //Swal.fire({ title: 'Successfully uploaded file on pharmacy!', icon: 'success' })
        this.prescriptionService.downloadPrescriptionSFTP(filename, pharmacy.apiKeyPharmacy, pharmacy.endpoint).subscribe(response => {
          if (response) Swal.fire({ title: 'Prescription successfully delivered!', icon: 'success' })
        }, error => {
          Swal.fire({ title: 'Unable to send prescription', text: 'Unable to connect to SFTP server', icon: 'error' })
        });
      }, error => {
        Swal.fire({ title: 'Unable to upload prescription', text: 'Unable to connect to SFTP server', icon: 'error' })
      });
    });



  }

}
