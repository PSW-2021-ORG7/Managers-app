import { Component, OnInit } from '@angular/core';
import { MedicationSpecificationService } from '../medication-specification/medication-specification.service';
import { PharmacyProfileService } from './pharmacy-profile.service';

export class Pharmacy {
  constructor(
    public idPharmacy: string,
    public namePharmacy: string,
    public apiKeyPharmacy: string,
    public endpoint: string,
    public address: string,
    public city: string,
    public contact: string,
    public email: string,
    public notes: string
  ) { }
}

@Component({
  selector: 'app-pharmacy-profile',
  templateUrl: './pharmacy-profile.component.html',
  styleUrls: ['./pharmacy-profile.component.scss']
})

export class PharmacyProfileComponent implements OnInit {

  pharmacies: Pharmacy[] = [];
  selectedPharmacyId: string = ""
  apiKeyPharmacy: string= ""

  pharmacyName: string = ""
  pharmacyAddress: string = ""
  pharmacyCity: string = ""
  pharmacyWebsite: string = ""
  pharmacyContact: string = ""
  pharmacyEmail: string = ""
  notes: string = ""
  disableFields: boolean = true



  constructor(private pharmacyService: PharmacyProfileService, private medicineService: MedicationSpecificationService) { }

  ngOnInit(): void {
    //Ucitaj apoteke
    this.pharmacyService.getPharmacies().subscribe((pharmacies: Pharmacy[]) => {
      this.pharmacies = pharmacies;
    });
  }

  selectChangeHandlerId(event: any) {
    this.selectedPharmacyId = event.target.value;
    console.log(this.selectedPharmacyId)

  }

  viewProfile(): void {

    this.disableFields = false;
    if (this.selectedPharmacyId == "") alert("Please select pharmacy!")
    else {
      this.medicineService.getPharmacyByID(this.selectedPharmacyId).subscribe((pharmacy: Pharmacy) => {

        this.apiKeyPharmacy = pharmacy.apiKeyPharmacy
        this.pharmacyName = pharmacy.namePharmacy
        this.pharmacyAddress = pharmacy.address
        this.pharmacyCity = pharmacy.city
        this.pharmacyWebsite = pharmacy.endpoint
        this.pharmacyContact = pharmacy.contact
        this.pharmacyEmail = pharmacy.email
        this.notes = pharmacy.notes

      });
    }
  }

  saveChanges(): void {
 
    var pharmacy = {
      idPharmacy: +this.selectedPharmacyId,
      apiKeyPharmacy: this.apiKeyPharmacy,
      namePharmacy: this.pharmacyName,
      endpoint: this.pharmacyWebsite,
      address: this.pharmacyAddress,
      city: this.pharmacyCity,
      contact: this.pharmacyContact,
      email: this.pharmacyEmail,
      notes: this.notes
    }
    console.log(pharmacy)
    this.pharmacyService.updatePharmacy(pharmacy, this.selectedPharmacyId).subscribe(response => {
      if (response) {
        alert("Successfully updated pharmacy!")
        window.location.reload()
      }
      else alert("Failed to update pharmacy... :(")
    });

  }

  cancelChanges(): void {
    this.disableFields = true;
    this.pharmacyName = ""
    this.pharmacyWebsite = ""
    this.pharmacyAddress = ""
    this.pharmacyCity = ""
    this.pharmacyContact = ""
    this.pharmacyEmail = ""
    this.notes = ""
  }
}
