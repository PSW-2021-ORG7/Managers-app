import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from './prescriptions.service';

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

export class Medicine {
  constructor(
    public name: string,
    public dosageInMilligrams: number
  ){ }
}

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss']
})
export class PrescriptionsComponent implements OnInit {

  prescriptions: Prescription[] = []
  selectedPrescriptionId: string = ""
  disableFields: boolean = true

  idPrescription: number = 0
  patient: string = "Patient"
  patientJMBG: string = "JMBG"
  doctor: string = "Doctor"
  medicine: string = "Medicine 0" //Medicine name & dose
  durationInDays: number = 0
  timesPerDay: number = 0
  description: string = "Description"

  constructor(private prescriptionService: PrescriptionService) { }

  ngOnInit(): void {

    this.prescriptionService.getPrescriptions().subscribe((prescrptions: Prescription[]) => {
      this.prescriptions = prescrptions
    });

  }

  selectChangeHandlerId(event: any) {
    this.selectedPrescriptionId = event.target.value;
    console.log(this.selectedPrescriptionId)

  }

  viewPrescription(): void{

    this.disableFields = false
    this.prescriptionService.getPrescriptionyByID(this.selectedPrescriptionId).subscribe((prescription: Prescription) => {
      this.patient = prescription.patient
      this.patientJMBG = prescription.patientJMBG
      this.doctor = prescription.doctor
      this.durationInDays = prescription.durationInDays
      this.timesPerDay = prescription.timesPerDay
      this.description = prescription.description

      this.prescriptionService.getMedicineById(prescription.medicineId).subscribe((medicine: Medicine) => {
        console.log(medicine)
        this.medicine = medicine.name + " " + medicine.dosageInMilligrams
      });

    });

  }

}
