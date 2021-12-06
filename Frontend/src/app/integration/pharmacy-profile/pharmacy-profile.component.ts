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
    public city: string
  ) { }
}

@Component({
  selector: 'app-pharmacy-profile',
  templateUrl: './pharmacy-profile.component.html',
  styleUrls: ['./pharmacy-profile.component.scss']
})

export class PharmacyProfileComponent implements OnInit {

  pharmacies: Pharmacy[] = [];
  selectedPharmacyId: string = "";

  pharmacyName: string = "Pharmacy Name Goes Here"
  pharmacyAddress: string = "Pharmacy Address Goes Here"
  pharmacyCity: string = "Pharmacy City Goes Here"
  pharmacyWebsite: string = "Pharmacy Website goes here"


  constructor(private pharmacyService: PharmacyProfileService,private medicineService: MedicationSpecificationService ) {}

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

  viewProfile(): void{

    if(this.selectedPharmacyId == "") alert ("Please select pharmacy!")
    else {
      this.medicineService.getPharmacyByID(this.selectedPharmacyId).subscribe((pharmacy: Pharmacy) => {
        
        console.log(pharmacy)
        
        this.pharmacyName = pharmacy.namePharmacy
        this.pharmacyAddress = pharmacy.address
        this.pharmacyCity = pharmacy.city
        this.pharmacyWebsite = pharmacy.endpoint
      });
    }
  }
}
