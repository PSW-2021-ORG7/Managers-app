import { Component, OnInit } from '@angular/core';
import { MedicationSpecificationService } from '../medication-specification/medication-specification.service';
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

export class Pharmacy {
  constructor(
    public idPharmacy: number,
    public namePharmacy: string,
    public apiKeyPharmacy: string,
    public endpoint: string
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
  pharmacies: Pharmacy[] = []
  selectedPrescriptionId: string = ""
  selectedPharmacyId: string = ""
  disableFields: boolean = true
  disableSend: boolean = true

  idPrescription: number = 0
  patient: string = "Patient"
  patientJMBG: string = "JMBG"
  doctor: string = "Doctor"
  medicine: string = "Medicine 0" //Medicine name & dose
  medicineObj: Medicine = {name:"", dosageInMilligrams: 0}
  durationInDays: number = 0
  timesPerDay: number = 0
  description: string = "Description"

  constructor(private prescriptionService: PrescriptionService, private medicationspec: MedicationSpecificationService) { }

  ngOnInit(): void {

    this.prescriptionService.getPrescriptions().subscribe((prescrptions: Prescription[]) => {
      this.prescriptions = prescrptions
    });

  }

  selectChangeHandlerId(event: any) {
    this.selectedPrescriptionId = event.target.value;
    console.log(this.selectedPrescriptionId)

  }

  selectChangeHandlerSelectedPharmacy(event: any) {
    this.selectedPharmacyId = event.target.value;
    this.disableSend = false
    console.log(this.selectedPharmacyId);
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
        this.medicineObj = medicine
        this.medicine = medicine.name + " " + medicine.dosageInMilligrams
      });

    });

  }

  checkIfAvailable(): void{
    
    var medicationSpecification = {
      name: this.medicineObj.name,
      dosageinmg: this.medicineObj.dosageInMilligrams,
      quantity: 1
    };

    this.medicationspec.checkIfAvailable(medicationSpecification).subscribe(response => {
      if(response){

        alert("Medicine available!")
        this.medicationspec.getPharmacyByID("1").subscribe(response =>{
          console.log(response)
          this.pharmacies.push(response)
        });
      } 
      else alert("Medicine not available...")
    });

  }

}
