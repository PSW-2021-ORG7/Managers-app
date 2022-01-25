import { Component } from '@angular/core';
import { PharmacyService } from './pharmacy-registration.service';
import Swal from 'sweetalert2'

export class Pharmacy {
  constructor(
    public namePharmacy: string,
    public apiKeyPharmacy: string,
    public endpoint: string,
    public address: string,
    public city: string,
    public contact: string,
    public email: string,
  ) { }
}

@Component({
  selector: 'app-pharmacy-registration',
  templateUrl: './pharmacy-registration.component.html',
  styleUrls: ['./pharmacy-registration.component.scss']
})
export class PharmacyRegistrationComponent {

  namePharmacy: string = ''
  apiKeyPharmacy: string = ''
  endpoint: string = ''
  address: string = ''
  city: string = ''
  contact: string = ''
  email: string = ''

  emailIsValid: boolean = true

  constructor(private pharmacyService: PharmacyService) { }

  selectChangeHandlerName(event: any) {
    this.namePharmacy = event.target.value;
    console.log("Name Input: " + this.namePharmacy);
  }

  selectChangeHandlerApiKey(event: any) {
    this.apiKeyPharmacy = event.target.value;
    console.log("API Key Input: " + this.apiKeyPharmacy);
  }

  selectChangeHandlerEndpoint(event: any) {
    this.endpoint = event.target.value;
    console.log("Website Input: " + this.endpoint);
  }

  selectChangeHandlerAddress(event: any) {
    this.address = event.target.value;
    console.log("Address Input: " + this.endpoint);
  }

  selectChangeHandlerCity(event: any) {
    this.city = event.target.value;
    console.log("City Input: " + this.endpoint);
  }

  selectChangeHandlerContact(event: any) {
    this.contact = event.target.value;
    console.log("Contact Input: " + this.endpoint);
  }

  selectChangeHandlerEmail(event: any) {
    this.email = event.target.value;
    console.log("Email Input: " + this.endpoint);
  }

  send(): void {

    this.validate()
    if (this.emailIsValid) {

      var registration = {
        namePharmacy: this.namePharmacy,
        apiKeyPharmacy: this.apiKeyPharmacy,
        endpoint: this.endpoint,
        address: this.address,
        city: this.city,
        contact: this.contact,
        email: this.email
      };

      console.log(registration)
      this.createNewPharmacy(registration);
    }
  }

  validate(): void {
    if (!this.email.match('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')) {
      this.emailIsValid = false
      this.email = ""
    } else this.emailIsValid = true
  }

  createNewPharmacy(registration: any): void {
    this.pharmacyService.createNewPharmacy(registration).subscribe(response => {
      if(response) Swal.fire({text: "Successfully registered pharmacy!", icon: 'success'}).then(function(){window.location.reload()})     
    }, error => {Swal.fire({
      title: "Oops!", 
      text: "Server appears to be down at the moment or double check input data",
      icon: 'error'
    }).then(function(){window.location.reload()}) 
  });
  }
}
