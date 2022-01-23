import { Component, OnInit } from '@angular/core';
import { MedicationSpecificationService } from '../medication-specification/medication-specification.service';
import { PharmacyProfileService } from './pharmacy-profile.service';
import Swal from 'sweetalert2'

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
    public notes: string,
    public photo: string
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
  apiKeyPharmacy: string = ""

  pharmacyName: string = ""
  pharmacyAddress: string = ""
  pharmacyCity: string = ""
  pharmacyWebsite: string = ""
  pharmacyContact: string = ""
  pharmacyEmail: string = ""
  notes: string = ""
  photo: string = ""
  disableFields: boolean = true

  showChart: boolean = false



  constructor(private pharmacyService: PharmacyProfileService, private medicineService: MedicationSpecificationService) { }

  ngOnInit(): void {
    //Ucitaj apoteke
    this.pharmacyService.getPharmacies().subscribe((pharmacies: Pharmacy[]) => {
      this.pharmacies = pharmacies;
    });
  }

  url = "../../../assets/images/integration.jpg"
  
  selectChangeHandlerId(event: any) {
    this.selectedPharmacyId = event.target.value
    this.showChart = false;
    this.cancelChanges()
    console.log(this.selectedPharmacyId)

  }

  viewProfile(): void {

    localStorage.setItem("selectedPharmacyId", JSON.stringify(this.selectedPharmacyId));
    this.showChart = true;
    this.disableFields = false;
    if (this.selectedPharmacyId == "")  Swal.fire({text: 'Please select pharmacy!', icon: 'warning'})
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
        this.photo = pharmacy.photo

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
      notes: this.notes,
      photo: this.photo
    }
    console.log(pharmacy)
    this.pharmacyService.updatePharmacy(pharmacy, this.selectedPharmacyId).subscribe(response => {
      if (response) {
        Swal.fire({ text: 'Successfully updated pharmacy information!', icon: 'success' }).then(function(){
          window.location.reload()
        })       
      }
    }, error => {
      Swal.fire({
        title: 'Error trying to update pharmacy',
        icon: 'error'
      })
    });

  }

  onFileChanged(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
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
    this.photo = ""
  }
}
